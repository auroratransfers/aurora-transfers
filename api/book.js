const { databaseConfigured, withDatabase } = require("../lib/db.cjs");
const { fail, method } = require("../lib/http.cjs");
const { hashToken, randomToken } = require("../lib/security.cjs");
const { appendEvent, reference, validateBooking } = require("../lib/rides.cjs");

function origin(req) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "aurora-transfers.vercel.app";
  return `${protocol}://${host}`;
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[char]);
}

async function sendEmail({ to, subject, html, replyTo }) {
  if (!process.env.RESEND_API_KEY || !to) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.BOOKING_FROM_EMAIL || "Aurora Transfers <bookings@auroratransfers.com>",
      to: [to], reply_to: replyTo, subject, html,
    }),
  });
  if (!response.ok) throw new Error(`Email delivery failed: ${response.status}`);
  return true;
}

function details(booking, rides, links) {
  const rows = rides.map((ride,index)=>`<li><strong>${escapeHtml(ride.reference)}</strong>: ${escapeHtml(index===0?booking.pickup:booking.destination)} &rarr; ${escapeHtml(index===0?booking.destination:booking.pickup)}, ${new Date(ride.scheduled_at).toLocaleString("en-GB",{timeZone:"Europe/Zagreb"})}</li>`).join("");
  const tracking = links.map((link,index)=>`<p><a href="${link}">Track ${rides.length>1?`ride ${index+1}`:"your ride"}</a></p>`).join("");
  const extras = booking.addons.length ? `<br>Extras: ${escapeHtml(booking.addons.join(", "))}` : "";
  const quote = booking.quoteAmount != null ? `<br>Test estimate: ${escapeHtml(String(booking.quoteAmount))} EUR` : "";
  return `<h2>Aurora transfer request</h2><p><strong>${escapeHtml(booking.name)}</strong><br>${escapeHtml(booking.email)}<br>${escapeHtml(booking.phone)}</p><ul>${rows}</ul><p>Service: ${escapeHtml(booking.service)}<br>Vehicle class: ${escapeHtml(booking.vehicleClass)}<br>Passengers: ${booking.passengers}${booking.service === "hourly-chauffeur" ? `<br>Hours: ${booking.hourlyHours}` : ""}${booking.flight?`<br>Flight: ${escapeHtml(booking.flight)}`:""}${extras}${quote}</p>${booking.message?`<p>Message: ${escapeHtml(booking.message)}</p>`:""}${tracking}`;
}

module.exports = async (req,res) => {
  if (!method(req,res,["POST"])) return;
  try {
    const booking=validateBooking(req.body && typeof req.body === "object" ? req.body : {});
    if(!databaseConfigured()){
      const adminEmail=process.env.BOOKING_TO_EMAIL || process.env.SITE_EMAIL;
      const fallbackHtml=`<h2>New Aurora transfer request</h2><p><strong>${escapeHtml(booking.name)}</strong><br>${escapeHtml(booking.email)}<br>${escapeHtml(booking.phone)}</p><p>${escapeHtml(booking.pickup)} &rarr; ${escapeHtml(booking.destination)}<br>${escapeHtml(booking.date)} ${escapeHtml(booking.time)}<br>Service: ${escapeHtml(booking.service)}<br>Vehicle class: ${escapeHtml(booking.vehicleClass)}<br>Passengers: ${booking.passengers}${booking.quoteAmount != null ? `<br>Test estimate: ${escapeHtml(String(booking.quoteAmount))} EUR` : ""}</p>${booking.flight?`<p>Flight: ${escapeHtml(booking.flight)}</p>`:""}`;
      const sent=await sendEmail({to:adminEmail,replyTo:booking.email,subject:"New Aurora transfer request",html:fallbackHtml});
      if(!sent) throw Object.assign(new Error("Booking service is not configured"),{status:503});
      return res.status(202).json({ok:true,persisted:false,trackingUrls:[]});
    }
    const created=await withDatabase((sql)=>sql.begin(async(tx)=>{
      const [rider]=await tx`insert into riders(full_name,email,phone,preferred_language) values(${booking.name},${booking.email},${booking.phone},${booking.language}) returning *`;
      const groupId=cryptoUuid();
      const specs=[{pickup:booking.pickup,destination:booking.destination,pickupLat:booking.pickupLatitude,pickupLng:booking.pickupLongitude,destinationLat:booking.destinationLatitude,destinationLng:booking.destinationLongitude,scheduledAt:booking.scheduledAt,leg:1}];
      if(booking.returnScheduledAt) specs.push({pickup:booking.destination,destination:booking.pickup,pickupLat:booking.destinationLatitude,pickupLng:booking.destinationLongitude,destinationLat:booking.pickupLatitude,destinationLng:booking.pickupLongitude,scheduledAt:booking.returnScheduledAt,leg:2});
      const rides=[]; const tokens=[];
      for(const spec of specs){
        const trackingToken=randomToken(32); const ref=reference();
        const [ride]=await tx`insert into rides(reference,booking_group_id,leg,rider_id,service,vehicle_class,addons,hourly_hours,quote_id,quote_amount,pickup_address,pickup_lat,pickup_lng,destination_address,destination_lat,destination_lng,scheduled_at,passenger_count,flight_number,flight_status,notes,tracking_token_hash,tracking_expires_at)
          values(${ref},${groupId},${spec.leg},${rider.id},${booking.service},${booking.vehicleClass},${tx.json(booking.addons)},${booking.service === "hourly-chauffeur" ? booking.hourlyHours : null},${booking.quoteId},${booking.quoteAmount},${spec.pickup},${spec.pickupLat},${spec.pickupLng},${spec.destination},${spec.destinationLat},${spec.destinationLng},${spec.scheduledAt},${booking.passengers},${booking.flight||null},${booking.flightStatus ? tx.json(booking.flightStatus) : null},${booking.message||null},${hashToken(trackingToken)},${new Date(new Date(spec.scheduledAt).getTime()+7*86400000).toISOString()}) returning *`;
        if (booking.flight) await tx`insert into flight_watches(ride_id,flight_number,provider,last_status,last_checked_at) values(${ride.id},${booking.flight},${booking.flightStatus ? "client" : "pending"},${booking.flightStatus ? tx.json(booking.flightStatus) : null},${booking.flightStatus ? new Date() : null})`;
        await appendEvent(tx,ride.id,"booking_created","rider",String(rider.id),null,"requested",{language:booking.language,leg:spec.leg,service:booking.service,vehicleClass:booking.vehicleClass,addons:booking.addons,quoteId:booking.quoteId,quoteAmount:booking.quoteAmount});
        rides.push(ride); tokens.push(trackingToken);
      }
      return {rides,tokens};
    }));
    const links=created.tokens.map((token)=>`${origin(req)}/track/?token=${encodeURIComponent(token)}&lang=${encodeURIComponent(booking.language)}`);
    const html=details(booking,created.rides,links);
    const adminEmail=process.env.BOOKING_TO_EMAIL || process.env.SITE_EMAIL;
    await Promise.allSettled([
      sendEmail({to:adminEmail,replyTo:booking.email,subject:`New Aurora booking: ${created.rides[0].reference}`,html}),
      sendEmail({to:booking.email,replyTo:adminEmail,subject:`Aurora transfer request ${created.rides[0].reference}`,html:`<p>Dear ${escapeHtml(booking.name)},</p><p>We received your transfer request. We will confirm the driver, vehicle and final price shortly.</p>${html}`}),
    ]);
    return res.status(201).json({ok:true,references:created.rides.map((ride)=>ride.reference),trackingUrls:links});
  } catch(error){ return fail(res,error); }
};

function cryptoUuid() {
  return require("crypto").randomUUID();
}

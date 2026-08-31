const { db, ensureSchema } = require("../lib/db.cjs");
const { clearDemoData, demoTrackingLinks, seedDemoData } = require("../lib/demo-data.cjs");

const action = process.argv[2];

if (!["seed", "clear"].includes(action)) {
  console.error("Usage: node scripts/demo-data.cjs <seed|clear>");
  process.exit(1);
}

(async () => {
  await ensureSchema();
  const result = action === "seed" ? await seedDemoData(db()) : await clearDemoData(db());

  if (action === "seed") {
    console.log("Aurora demo data is ready.");
    console.log(JSON.stringify(result.counts));
    console.log("Passenger tracking links:");
    demoTrackingLinks(process.env.PUBLIC_SITE_URL || "https://aurora-transfers.vercel.app").forEach((link) => {
      console.log(`${link.reference}: ${link.url}`);
    });
  } else if (result.removed) {
    console.log(`Aurora demo data removed: ${JSON.stringify(result.counts)}`);
  } else {
    console.log("No Aurora demo data is currently seeded.");
  }
})()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db().end({ timeout: 5 }).catch(() => {});
  });

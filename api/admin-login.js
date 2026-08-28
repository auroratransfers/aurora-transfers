const crypto = require("crypto");
const { withDatabase } = require("../lib/db.cjs");
const { body, fail, method } = require("../lib/http.cjs");
const { createAdminSession, secureEqual, setAdminCookie } = require("../lib/security.cjs");

module.exports = async (req, res) => {
  if (!method(req, res, ["POST"])) return;
  try {
    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) throw Object.assign(new Error("Admin security is not configured"), { status: 503 });
    const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex");
    await withDatabase(async (sql) => {
      const [attempt] = await sql`select * from admin_login_attempts where ip_hash=${ipHash}`;
      if (attempt?.locked_until && new Date(attempt.locked_until) > new Date()) throw Object.assign(new Error("Too many attempts. Try again later."), { status: 429 });
      if (!secureEqual(body(req).password, process.env.ADMIN_PASSWORD)) {
        await sql`insert into admin_login_attempts (ip_hash,failures,window_started_at,locked_until)
          values (${ipHash},1,now(),null)
          on conflict (ip_hash) do update set
            failures=case when admin_login_attempts.window_started_at < now()-interval '15 minutes' then 1 else admin_login_attempts.failures+1 end,
            window_started_at=case when admin_login_attempts.window_started_at < now()-interval '15 minutes' then now() else admin_login_attempts.window_started_at end,
            locked_until=case when admin_login_attempts.failures >= 4 then now()+interval '15 minutes' else null end`;
        throw Object.assign(new Error("Invalid password"), { status: 401 });
      }
      await sql`delete from admin_login_attempts where ip_hash=${ipHash}`;
    });
    setAdminCookie(res, createAdminSession());
    return res.status(200).json({ ok: true });
  } catch (error) { return fail(res, error); }
};

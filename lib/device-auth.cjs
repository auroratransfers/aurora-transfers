const { bearerToken, hashToken } = require("./security.cjs");

async function authenticateDevice(sql, req) {
  const token = bearerToken(req);
  if (!token) throw Object.assign(new Error("Device authentication required"), { status: 401 });
  const [device] = await sql`select * from device_credentials where token_hash=${hashToken(token)} and active=true and revoked_at is null`;
  if (!device) throw Object.assign(new Error("Invalid or revoked device token"), { status: 401 });
  await sql`update device_credentials set last_seen_at=now() where id=${device.id}`;
  return device;
}

module.exports = { authenticateDevice };

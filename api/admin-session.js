const { databaseConfigured } = require("../lib/db.cjs");
const { method } = require("../lib/http.cjs");
const { isAdmin } = require("../lib/security.cjs");

module.exports = async (req, res) => {
  if (!method(req, res, ["GET"])) return;
  return res.status(200).json({
    ok: true,
    authenticated: isAdmin(req),
    configured: Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET && databaseConfigured()),
    database: databaseConfigured(),
  });
};

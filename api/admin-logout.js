const { method } = require("../lib/http.cjs");
const { setAdminCookie } = require("../lib/security.cjs");

module.exports = async (req, res) => {
  if (!method(req, res, ["POST"])) return;
  setAdminCookie(res, "", 0);
  return res.status(200).json({ ok: true });
};

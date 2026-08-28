const { db, ensureSchema } = require("../lib/db.cjs");

(async () => {
  await ensureSchema();
  await db().end();
  console.log("Aurora database schema is up to date.");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

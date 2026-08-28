const postgres = require("postgres");
const { SCHEMA_SQL } = require("./schema.cjs");

let client;
let schemaPromise;

function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  if (!client) {
    client = postgres(url, {
      max: 3,
      idle_timeout: 20,
      connect_timeout: 10,
      ssl: url.includes("localhost") ? false : "require",
    });
  }
  return client;
}

async function ensureSchema() {
  if (!schemaPromise) {
    schemaPromise = db().unsafe(SCHEMA_SQL).catch((error) => {
      schemaPromise = undefined;
      throw error;
    });
  }
  await schemaPromise;
}

async function withDatabase(handler) {
  if (!databaseConfigured()) {
    const error = new Error("Aurora database is not configured");
    error.status = 503;
    throw error;
  }
  return handler(db());
}

module.exports = { databaseConfigured, db, ensureSchema, withDatabase };

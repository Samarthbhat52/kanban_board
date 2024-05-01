import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

if (!env.DATABASE_URL) {
  console.log("🔴 cannot find database URL");
}
/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;
const db = drizzle(conn, { schema });

const migrateDb = async () => {
  try {
    console.log("🟠 Migrating client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("🟢 Successfully migrated");
  } catch (error) {
    console.log("🔴 Error migrating client");
  }
};
migrateDb();

export default db;

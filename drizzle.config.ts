import { type Config } from "drizzle-kit";

import { env } from "@/env";

if (!env.DATABASE_URL) {
  console.log("🔴 cannot find database URL");
}

export default {
  schema: "./src/server/db/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  // tablesFilter: ["kanban_board_*"],
} satisfies Config;

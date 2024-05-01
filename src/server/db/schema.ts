// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { pgTableCreator, timestamp, uuid, text } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const workspaces = createTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: false })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  workspaceOwner: uuid("workspace_owner").notNull(),
  title: text("title").notNull(),
  iconId: text("icon_id").notNull(),
  data: text("data"),
  inTrash: text("in_trash"),
  updatedAt: timestamp("updatedAt"),
  logo: text("logo"),
  banner_url: text("banner_url"),
});

export const profiles = createTable("profiles", {
  id: uuid("id").primaryKey().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  fullName: text("full_name"),
  email: text("email"),
  avatarUrl: text("avatar_url"),
});

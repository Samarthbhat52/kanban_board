import {
  pgTable,
  pgEnum,
  uuid,
  timestamp,
  text,
  foreignKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);

export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  workspaceOwner: uuid("workspace_owner").notNull(),
  title: text("title").notNull(),
  iconId: text("icon_id").notNull(),
  data: text("data"),
  inTrash: text("in_trash"),
  updatedAt: timestamp("updatedAt", { mode: "string" }),
  logo: text("logo"),
  bannerUrl: text("banner_url"),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  fullName: text("full_name"),
  email: text("email"),
  avatarUrl: text("avatar_url"),
});

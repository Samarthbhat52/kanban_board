CREATE TABLE IF NOT EXISTS "workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"workspace_owner" uuid NOT NULL,
	"title" text NOT NULL,
	"icon_id" text NOT NULL,
	"data" text,
	"in_trash" text,
	"updatedAt" timestamp,
	"logo" text,
	"banner_url" text
);

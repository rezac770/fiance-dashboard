CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"plaid_id" text,
	"name" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "update" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text
);

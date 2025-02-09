CREATE TABLE IF NOT EXISTS "settings" (
	"id" text PRIMARY KEY NOT NULL,
	"api_key" text,
	"webhook_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "voices" (
	"id" serial PRIMARY KEY NOT NULL,
	"voice_id" text NOT NULL,
	"name" text NOT NULL,
	"gender" text NOT NULL,
	"language" text NOT NULL,
	"country" text NOT NULL,
	"category" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "company" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "company" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "status" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "status" SET DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "station_ids" json DEFAULT '[]'::json;
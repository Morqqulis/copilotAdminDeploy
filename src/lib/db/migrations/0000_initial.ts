import { sql } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, json } from 'drizzle-orm/pg-core';

export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  country: text('country').notNull(),
  city: text('city').notNull(),
  timezone: text('timezone').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const stations = pgTable('stations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  locationId: serial('location_id').references(() => locations.id),
  omniplayerId: text('omniplayer_id').notNull(),
  language: text('language').notNull(),
  website: text('website'),
  logo: text('logo'),
  status: text('status').notNull(),
  systemPrompt: text('system_prompt'),
  prompts: json('prompts'),
  createdAt: timestamp('created_at').defaultNow(),
});

export async function up(db: any) {
  await db.schema.createTable(locations).execute();
  await db.schema.createTable(stations).execute();
}

export async function down(db: any) {
  await db.schema.dropTable(stations).execute();
  await db.schema.dropTable(locations).execute();
} 
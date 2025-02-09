import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { 
  pgTable, 
  serial, 
  text, 
  timestamp, 
  boolean,
  json,
  varchar,
  jsonb
} from 'drizzle-orm/pg-core';

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
  omniplayerUrl: text('omniplayer_url').notNull(),
  clientId: text('client_id').notNull(),
  clientSecret: text('client_secret').notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  language: text('language').notNull(),
  website: text('website'),
  logo: text('logo'),
  status: text('status').notNull(),
  systemPrompt: text('system_prompt'),
  prompts: json('prompts'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company').notNull(),
  website: text('website'),
  logo: text('logo'),
  status: text('status').notNull().default('active'),
  stationIds: json('station_ids').default([]),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const clientStations = pgTable('client_stations', {
  clientId: serial('client_id').references(() => clients.id),
  stationId: serial('station_id').references(() => stations.id),
});

export const settings = pgTable('settings', {
  id: text('id').primaryKey(),
  apiKey: text('api_key'),
  webhookUrl: text('webhook_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const voices = pgTable('voices', {
  id: serial('id').primaryKey(),
  voiceId: text('voice_id').notNull(),
  name: text('name').notNull(),
  gender: text('gender').notNull(),
  language: text('language').notNull(),
  country: text('country').notNull(),
  category: text('category').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// ... similar tables for voices and clients 
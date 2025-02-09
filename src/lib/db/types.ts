import { type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export type DbClient = NeonHttpDatabase<typeof schema>; 
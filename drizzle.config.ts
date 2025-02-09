import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '.env') });
dotenv.config({ path: resolve(__dirname, '.env.local') });
dotenv.config({ path: resolve(__dirname, '.env.production') });


const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!dbUrl) {
  throw new Error('Database URL environment variable is required');
}

export default {
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: dbUrl,
  },
  verbose: true,
  strict: true,
} satisfies Config; 
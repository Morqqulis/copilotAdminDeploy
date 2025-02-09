import { sql } from '@vercel/postgres'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { resolve } from 'path'

// Load both .env and .env.local files
config({ path: resolve(__dirname, '../../../.env') })
config({ path: resolve(__dirname, '../../../.env.local') })

// Use environment variables from .env.local if available
const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL

const db = drizzle(sql)

async function runMigration() {
	if (!dbUrl) {
		throw new Error('Database URL environment variable is required (DATABASE_URL or POSTGRES_URL)')
	}
	try {
		console.log('Starting migration...')
		console.log('Using database URL:', dbUrl.replace(/:[^:@]*@/, ':***@'))

		// Create clients table if it doesn't exist
		await sql`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL DEFAULT '',
        status VARCHAR(50) NOT NULL DEFAULT 'active',
        station_ids JSONB DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `

		console.log('Migration completed successfully')
	} catch (error) {
		console.error('Migration failed:', error)
		process.exit(1)
	}
}

runMigration()

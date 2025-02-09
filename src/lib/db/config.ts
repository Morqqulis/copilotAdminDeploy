import { sql } from '@vercel/postgres'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { resolve } from 'path'

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  config({ path: resolve(__dirname, '../../../.env') })
  config({ path: resolve(__dirname, '../../../.env.local') })
}

const dbUrl = process.env.DATABASE_URL as string || process.env.POSTGRES_URL as string

if (!dbUrl) {
  throw new Error('Database URL environment variable is required (DATABASE_URL or POSTGRES_URL)')
}

// Add connection logging
console.log('Initializing database connection with URL:', 
  dbUrl.replace(/:[^:@]*@/, ':***@')) // Hide password in logs

export const db = drizzle(sql)

// Test the connection
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`
    console.log('Database connection successful:', result)
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
} 
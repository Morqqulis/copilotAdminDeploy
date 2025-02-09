import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { clients } from './schema'

const db = drizzle(sql)

async function seed() {
  try {
    console.log('Seeding started...')

    // Create test client
    await db.insert(clients).values({
      name: 'Test Client',
      email: 'test@example.com',
      company: 'Test Company',
      status: 'active',
      stationIds: [],
      createdAt: new Date(),
    }).onConflictDoNothing()

    console.log('Seeding completed.')
  } catch (error) {
    console.error('Seeding error:', error)
    process.exit(1)
  }
}

seed() 
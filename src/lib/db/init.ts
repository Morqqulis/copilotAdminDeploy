import { db } from './config';
import { stations, locations } from './schema';

async function checkDatabase() {
  try {
    console.log('Checking database connection...');
    
    // Try to query the tables
    const existingStations = await db.select().from(stations);
    const existingLocations = await db.select().from(locations);
    
    console.log('Database check successful');
    console.log('Existing stations:', existingStations.length);
    console.log('Existing locations:', existingLocations.length);
  } catch (error) {
    console.error('Database check failed:', error);
    process.exit(1);
  }
}

checkDatabase(); 
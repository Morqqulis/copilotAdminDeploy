import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config';
import { locations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allLocations = await db.select().from(locations);
    return NextResponse.json(allLocations);
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(locations).values({
      name: body.name,
      country: body.country,
      city: body.city,
      timezone: body.timezone,
    }).returning();
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Failed to create location:', error);
    return NextResponse.json(
      { error: 'Failed to create location' },
      { status: 500 }
    );
  }
} 
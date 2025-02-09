import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config';
import { stations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import type { Station } from '@/lib/types';

export async function GET() {
  // Return mock data for now
  return NextResponse.json([
    {
      id: 1,
      name: "Radio One",
      stationId: "RAD1",
      locationId: 1,
      website: "https://radioone.com",
      status: "active"
    }
  ]);
}

export async function POST(request: Request) {
  const data = await request.json();
  // Add validation here
  return NextResponse.json({
    id: Math.floor(Math.random() * 1000),
    ...data,
    stationId: data.stationId || `RAD${Math.floor(Math.random() * 1000)}`
  });
} 
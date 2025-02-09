import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { clients } from '@/lib/db/schema';
import { cookies } from 'next/headers';
import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allClients = await db.select().from(clients);
    return NextResponse.json(allClients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newClient = await db.insert(clients).values(data).returning();
    return NextResponse.json(newClient[0]);
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
} 
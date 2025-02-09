import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config';
import { locations } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const result = await db.update(locations)
      .set({
        name: body.name,
        country: body.country,
        city: body.city,
        timezone: body.timezone,
      })
      .where(eq(locations.id, parseInt(params.id)))
      .returning();
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Failed to update location:', error);
    return NextResponse.json(
      { error: 'Failed to update location' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(locations)
      .where(eq(locations.id, parseInt(params.id)));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete location:', error);
    return NextResponse.json(
      { error: 'Failed to delete location' },
      { status: 500 }
    );
  }
} 
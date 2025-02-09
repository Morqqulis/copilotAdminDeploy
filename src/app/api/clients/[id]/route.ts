import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config';
import { clients } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const result = await db.update(clients)
      .set({
        name: body.name,
        email: body.email,
        company: body.company,
        status: body.status,
      })
      .where(eq(clients.id, parseInt(params.id)))
      .returning();
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Failed to update client:', error);
    return NextResponse.json(
      { error: 'Failed to update client' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(clients)
      .where(eq(clients.id, parseInt(params.id)));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete client:', error);
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
} 
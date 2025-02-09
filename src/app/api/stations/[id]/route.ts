import { NextResponse } from 'next/server'
import { db } from '@/lib/db/config'
import { stations } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const result = await db
      .update(stations)
      .set(body)
      .where(eq(stations.id, parseInt(params.id, 10)))
      .returning()
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Failed to update station:', error)
    return NextResponse.json({ error: 'Failed to update station' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db
      .delete(stations)
      .where(eq(stations.id, parseInt(params.id, 10)))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete station:', error)
    return NextResponse.json({ error: 'Failed to delete station' }, { status: 500 })
  }
} 
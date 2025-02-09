import { NextResponse } from 'next/server'
import { db } from '@/lib/db/config'
import { voices } from '@/lib/db/schema'

export async function GET() {
  try {
    const allVoices = await db.select().from(voices)
    return NextResponse.json(allVoices)
  } catch (error) {
    console.error('Failed to fetch voices:', error)
    return NextResponse.json({ error: 'Failed to fetch voices' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await db.insert(voices).values(body).returning()
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Failed to create voice:', error)
    return NextResponse.json({ error: 'Failed to create voice' }, { status: 500 })
  }
} 
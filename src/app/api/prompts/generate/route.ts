import { NextResponse } from 'next/server'
import { StationPrompt } from '@/lib/types'

const TIME_SLOTS = ['HH00', 'HH10', 'HH20', 'HH30', 'HH40', 'HH50', 'HH55']

export async function POST(request: Request) {
  try {
    const { format, language } = await request.json()

    // Here you would integrate with your AI service to generate prompts
    // For now, we'll return mock data
    const systemPrompt = `You are a radio host for a ${format} format station...`
    
    const hourlyPrompts: StationPrompt[] = TIME_SLOTS.map(label => ({
      id: Math.random().toString(36).substr(2, 9),
      label: label as StationPrompt['label'],
      content: `Generated prompt for ${label}...`,
      isActive: true,
      lastModified: new Date(),
    }))

    return NextResponse.json({
      system: systemPrompt,
      hourly: hourlyPrompts
    })
  } catch (error) {
    console.error('Failed to generate prompts:', error)
    return NextResponse.json(
      { error: 'Failed to generate prompts' },
      { status: 500 }
    )
  }
} 
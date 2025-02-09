import { NextResponse } from 'next/server';
import crypto from 'crypto';

function generateApiKey() {
  // Generate a random string of 32 bytes and convert to hex
  const key = crypto.randomBytes(32).toString('hex');
  // Add a prefix to make it easily identifiable
  return `rcp_${key}`;
}

export async function POST() {
  try {
    const newApiKey = generateApiKey();
    
    // In a real application, you would save this to the database
    // and associate it with the current user
    
    return NextResponse.json({ apiKey: newApiKey });
  } catch (error) {
    console.error('Failed to generate API key:', error);
    return NextResponse.json(
      { error: 'Failed to generate API key' },
      { status: 500 }
    );
  }
} 
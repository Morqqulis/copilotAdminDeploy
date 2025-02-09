import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    
    // More detailed environment variable logging
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      ADMIN_USERNAME_EXISTS: typeof process.env.ADMIN_USERNAME === 'string',
      ADMIN_PASSWORD_EXISTS: typeof process.env.ADMIN_PASSWORD === 'string',
      ADMIN_USERNAME_LENGTH: process.env.ADMIN_USERNAME?.length,
      ADMIN_PASSWORD_LENGTH: process.env.ADMIN_PASSWORD?.length
    })

    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
      console.error('Missing environment variables for authentication')
      return NextResponse.json(
        { error: 'Server configuration error - missing credentials' },
        { status: 500 }
      )
    }

    // Trim whitespace from credentials before comparing
    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()
    const expectedUsername = process.env.ADMIN_USERNAME.trim()
    const expectedPassword = process.env.ADMIN_PASSWORD.trim()

    console.log('Login attempt:', { 
      providedUsername: trimmedUsername,
      usernameMatch: trimmedUsername === expectedUsername,
      passwordLength: trimmedPassword?.length,
      expectedPasswordLength: expectedPassword?.length
    })

    if (
      trimmedUsername === expectedUsername && 
      trimmedPassword === expectedPassword
    ) {
      cookies().set('auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 24 hours
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Authentication failed - ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
} 
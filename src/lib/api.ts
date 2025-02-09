import type { Client, Station, Location, Voice, Settings } from './types'

const API_BASE_URL = '/api'

interface ApiConfig {
  apiKey?: string;
}

let apiConfig: ApiConfig = {}

export function configureApi(config: ApiConfig) {
  apiConfig = config
}

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized')
    }
    throw new Error(`API error: ${response.statusText}`)
  }

  return response.json()
} 
import { useState, useEffect } from 'react'
import { Station } from '@/lib/types'
import { fetchApi } from '@/lib/api'

export function useStations() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStations()
  }, [])

  async function fetchStations() {
    try {
      const data = await fetchApi<Station[]>('/stations')
      setStations(data)
    } catch (error) {
      setError('Failed to fetch stations')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function createStation(station: Partial<Station>) {
    try {
      const data = await fetchApi<Station>('/stations', {
        method: 'POST',
        body: JSON.stringify(station),
      })
      setStations([...stations, data])
      return data
    } catch (error) {
      console.error('Failed to create station:', error)
      throw error
    }
  }

  // Add similar functions for update and delete

  return {
    stations,
    loading,
    error,
    createStation,
    // ... other functions
  }
} 
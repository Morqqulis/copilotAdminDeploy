'use client'

import { useEffect, useState } from 'react'
import { Station, Location } from '@/lib/types'
import Modal from '@/components/ui/Modal'
import StationForm from '@/components/forms/StationForm'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingStation, setEditingStation] = useState<Station | null>(null)

  useEffect(() => {
    Promise.all([
      fetchStations(),
      fetchLocations()
    ]).finally(() => setLoading(false))
  }, [])

  const fetchStations = async () => {
    try {
      const response = await fetch('/api/stations')
      if (!response.ok) throw new Error('Failed to fetch stations')
      const data = await response.json()
      setStations(data)
    } catch (error) {
      console.error('Error fetching stations:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch stations')
    }
  }

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations')
      if (!response.ok) throw new Error('Failed to fetch locations')
      const data = await response.json()
      setLocations(data)
    } catch (error) {
      console.error('Error fetching locations:', error)
    }
  }

  const handleAddStation = async (newStation: Partial<Station>) => {
    try {
      const response = await fetch('/api/stations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStation),
      })
      const data = await response.json()
      setStations([...stations, data])
    } catch (error) {
      console.error('Error adding station:', error)
    }
  }

  const handleEditStation = (updatedStation: Partial<Station>) => {
    setStations(stations.map(station => 
      station.id === editingStation?.id 
        ? { ...station, ...updatedStation }
        : station
    ))
    setEditingStation(null)
  }

  const handleDeleteStation = async (stationId: number) => {
    if (confirm('Are you sure you want to delete this station?')) {
      try {
        const response = await fetch(`/api/stations/${stationId}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete station')
        }

        setStations(stations.filter(station => station.id !== stationId))
      } catch (error) {
        console.error('Error deleting station:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading stations...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Radio Stations</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary"
        >
          Add Station
        </button>
      </div>

      {stations.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-6 text-center text-muted-foreground">
          No stations found. Add your first station to get started.
        </div>
      ) : (
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Station ID</th>
                <th>Location</th>
                <th>Website</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station) => {
                const location = locations.find(l => l.id === station.locationId)
                return (
                  <tr key={station.id}>
                    <td className="text-foreground font-medium">
                      {station.name}
                    </td>
                    <td className="text-muted-foreground">
                      {station.stationId}
                    </td>
                    <td>
                      <div className="text-foreground">{location?.city}</div>
                      <div className="text-muted-foreground text-sm">{location?.country}</div>
                    </td>
                    <td className="text-muted-foreground">
                      {station.website}
                    </td>
                    <td>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${station.status === 'active' 
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {station.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingStation(station)}
                          className="p-2 hover:text-primary"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStation(station.id)}
                          className="p-2 hover:text-destructive"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Station"
      >
        <StationForm
          locations={locations}
          onSubmit={handleAddStation}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingStation}
        onClose={() => setEditingStation(null)}
        title="Edit Station"
      >
        <StationForm
          initialData={editingStation || undefined}
          locations={locations}
          onSubmit={handleEditStation}
          onCancel={() => setEditingStation(null)}
        />
      </Modal>
    </div>
  )
} 
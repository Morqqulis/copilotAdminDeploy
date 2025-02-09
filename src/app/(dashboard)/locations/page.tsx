'use client'

import { useState, useEffect } from 'react'
import { Location } from '@/lib/types'
import Modal from '@/components/ui/Modal'
import LocationForm from '@/components/forms/LocationForm'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations')
      if (!response.ok) throw new Error('Failed to fetch locations')
      const data = await response.json()
      setLocations(data)
    } catch (error) {
      console.error('Error fetching locations:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch locations')
    } finally {
      setLoading(false)
    }
  }

  const handleAddLocation = async (newLocation: Partial<Location>) => {
    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLocation),
      })
      const data = await response.json()
      setLocations([...locations, data])
      setIsAddModalOpen(false)
    } catch (error) {
      console.error('Error adding location:', error)
    }
  }

  const handleEditLocation = async (updatedLocation: Partial<Location>) => {
    try {
      const response = await fetch(`/api/locations/${editingLocation?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLocation),
      })
      const data = await response.json()
      setLocations(locations.map(location => 
        location.id === editingLocation?.id ? data : location
      ))
      setEditingLocation(null)
    } catch (error) {
      console.error('Error updating location:', error)
    }
  }

  const handleDeleteLocation = async (locationId: number) => {
    if (!confirm('Are you sure you want to delete this location?')) return

    try {
      await fetch(`/api/locations/${locationId}`, {
        method: 'DELETE',
      })
      setLocations(locations.filter(location => location.id !== locationId))
    } catch (error) {
      console.error('Error deleting location:', error)
    }
  }

  if (loading) {
    return <div>Loading locations...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Locations</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary"
        >
          Add Location
        </button>
      </div>

      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>City</th>
              <th>Timezone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                <td className="text-foreground">{location.name}</td>
                <td className="text-muted-foreground">{location.country}</td>
                <td className="text-muted-foreground">{location.city}</td>
                <td className="text-muted-foreground">{location.timezone}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingLocation(location)}
                      className="p-2 hover:text-primary"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteLocation(location.id)}
                      className="p-2 hover:text-destructive"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Location"
      >
        <LocationForm
          onSubmit={handleAddLocation}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingLocation}
        onClose={() => setEditingLocation(null)}
        title="Edit Location"
      >
        <LocationForm
          initialData={editingLocation || undefined}
          onSubmit={handleEditLocation}
          onCancel={() => setEditingLocation(null)}
        />
      </Modal>
    </div>
  )
} 
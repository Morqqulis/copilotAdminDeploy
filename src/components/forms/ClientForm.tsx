'use client'

import { useState } from 'react'
import type { Client, Station } from '@/lib/types'

interface ClientFormProps {
  initialData?: Partial<Client>
  stations: Station[]
  onSubmit: (data: Partial<Client>) => void
  onCancel: () => void
}

export default function ClientForm({ 
  initialData, 
  stations, 
  onSubmit, 
  onCancel 
}: ClientFormProps) {
  const [formData, setFormData] = useState<Partial<Client>>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    company: initialData?.company || '',
    website: initialData?.website || '',
    logo: initialData?.logo || '',
    status: initialData?.status || 'active',
    stationIds: initialData?.stationIds || []
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-border 
            bg-background px-3 py-2 text-sm placeholder-muted-foreground 
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border border-border 
            bg-background px-3 py-2 text-sm placeholder-muted-foreground 
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-foreground">
          Company
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="mt-1 block w-full rounded-md border border-border 
            bg-background px-3 py-2 text-sm placeholder-muted-foreground 
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-foreground">
          Website
        </label>
        <input
          type="url"
          id="website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="mt-1 block w-full rounded-md border border-border 
            bg-background px-3 py-2 text-sm placeholder-muted-foreground 
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="logo" className="block text-sm font-medium text-foreground">
          Logo URL
        </label>
        <input
          type="url"
          id="logo"
          value={formData.logo}
          onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
          className="mt-1 block w-full rounded-md border border-border 
            bg-background px-3 py-2 text-sm placeholder-muted-foreground 
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-foreground">
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
          className="mt-1 block w-full rounded-md border border-border 
            bg-background px-3 py-2 text-sm placeholder-muted-foreground 
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground">
          Associated Stations
        </label>
        <div className="mt-2 space-y-2">
          {stations.map((station) => (
            <label key={station.id} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={formData.stationIds?.includes(station.id)}
                onChange={(e) => {
                  const newStationIds = e.target.checked
                    ? [...(formData.stationIds || []), station.id]
                    : formData.stationIds?.filter(id => id !== station.id) || []
                  setFormData({ ...formData, stationIds: newStationIds })
                }}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-foreground">{station.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-foreground 
            bg-background border border-border rounded-md hover:bg-muted 
            focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-primary-foreground 
            bg-primary rounded-md hover:bg-primary/90 
            focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
} 
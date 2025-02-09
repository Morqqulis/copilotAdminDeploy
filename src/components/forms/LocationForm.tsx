'use client'

import { useState } from 'react'
import { Location } from '@/lib/types'
import { COUNTRIES, TIMEZONES } from '@/lib/constants'
import { ShimmerButton } from "@/components/ui/shimmer-button"

interface LocationFormProps {
  initialData?: Location;
  onSubmit: (data: Partial<Location>) => void;
  onCancel: () => void;
}

export default function LocationForm({ initialData, onSubmit, onCancel }: LocationFormProps) {
  const [formData, setFormData] = useState<Partial<Location>>(initialData || {
    name: '',
    country: '',
    city: '',
    timezone: 'UTC',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      id: initialData?.id,
      createdAt: initialData?.createdAt,
    })
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
            focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
            focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select a country</option>
          {Object.entries(COUNTRIES).map(([code, name]) => (
            <option key={code} value={code}>
              {name} ({code})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
            focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Timezone
        </label>
        <select
          value={formData.timezone}
          onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
            focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select a timezone</option>
          {TIMEZONES.map((timezone) => (
            <option key={timezone} value={timezone}>
              {timezone}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <ShimmerButton
          type="button"
          onClick={onCancel}
          background="hsl(var(--muted))"
          className="shadow-lg"
        >
          Cancel
        </ShimmerButton>
        <ShimmerButton
          type="submit"
          background="hsl(var(--primary))"
          className="shadow-lg"
        >
          {initialData ? 'Update Location' : 'Add Location'}
        </ShimmerButton>
      </div>
    </form>
  )
} 
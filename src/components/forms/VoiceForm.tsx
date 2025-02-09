'use client'

import { useState } from 'react'
import { Voice, VoiceCategory } from '@/lib/types'
import { COUNTRIES } from '@/lib/constants'
import { ShimmerButton } from "@/components/ui/shimmer-button"

interface VoiceFormProps {
  initialData?: Voice;
  onSubmit: (newVoice: Partial<Voice>) => void;
  onCancel: () => void;
}

interface VoiceFormData {
  name: string
  voiceId: string
  gender: 'male' | 'female'
  language: string
  accent?: string
  age?: number
  category: string
  country: string
  status: 'active' | 'inactive'
}

const VOICE_CATEGORIES: { value: VoiceCategory; label: string }[] = [
  { value: 'voicetracking', label: 'Voice Tracking' },
  { value: 'news', label: 'News' },
  { value: 'caller', label: 'Caller' },
]

export default function VoiceForm({ initialData, onSubmit, onCancel }: VoiceFormProps) {
  const [formData, setFormData] = useState<VoiceFormData>({
    name: initialData?.name || '',
    voiceId: initialData?.voiceId || '',
    gender: initialData?.gender || 'male',
    language: initialData?.language || '',
    accent: initialData?.accent,
    age: initialData?.age,
    category: initialData?.category || 'news',
    country: initialData?.country || '',
    status: initialData?.status || 'active'
  })

  return (
    <form className="space-y-6" onSubmit={(e) => {
      e.preventDefault()
      onSubmit(formData)
    }}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Voice ID
        </label>
        <input
          type="text"
          value={formData.voiceId}
          onChange={(e) => setFormData({ ...formData, voiceId: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
            focus:border-indigo-500 focus:ring-indigo-500"
          required
          placeholder="e.g., pQB83Phx1CmQQkTQxu6o"
          pattern="[A-Za-z0-9]{20}"
          title="Voice ID should be 20 alphanumeric characters"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Voice Name
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
          Gender
        </label>
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value as Voice['gender'] })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
            focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Language
        </label>
        <input
          type="text"
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
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
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as VoiceCategory })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
            focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          {VOICE_CATEGORIES.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
            focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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
          {initialData ? 'Update Voice' : 'Add Voice'}
        </ShimmerButton>
      </div>
    </form>
  )
} 
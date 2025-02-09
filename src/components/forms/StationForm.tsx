'use client'

import { useState } from 'react'
import { Station, Location, StationPrompt } from '@/lib/types'
import { Tab } from '@headlessui/react'
import { LANGUAGES } from '@/lib/constants'
import { ShimmerButton } from "@/components/ui/shimmer-button"

interface StationFormProps {
  initialData?: Station;
  locations: Location[];
  onSubmit: (data: Partial<Station>) => void;
  onCancel: () => void;
}

interface StationFormData {
  name: string
  stationId: string
  locationId: number
  website: string
  status: 'active' | 'inactive'
  omniplayerUrl: string
  clientId: string
  clientSecret: string
  username: string
  password: string
  language: string
  systemPrompt?: string
  prompts?: StationPrompt[]
}

const TIME_SLOTS = {
  'HH00': 'Every Hour (00:00)',
  'HH10': 'Every Hour (00:10)',
  'HH20': 'Every Hour (00:20)',
  'HH30': 'Every Hour (00:30)',
  'HH40': 'Every Hour (00:40)',
  'HH50': 'Every Hour (00:50)',
  'HH55': 'Every Hour (00:55)',
} as const;

const PROMPT_TYPES = {
  'news': 'News Update',
  'weather': 'Weather Report',
  'traffic': 'Traffic Update',
  'custom': 'Custom Prompt'
} as const;

export default function StationForm({ initialData, locations, onSubmit, onCancel }: StationFormProps) {
  const [formData, setFormData] = useState<StationFormData>({
    name: initialData?.name || '',
    stationId: initialData?.stationId || '',
    locationId: initialData?.locationId || locations[0]?.id || 0,
    website: initialData?.website || '',
    status: initialData?.status || 'active',
    omniplayerUrl: initialData?.omniplayerUrl || '',
    clientId: initialData?.clientId || '',
    clientSecret: initialData?.clientSecret || '',
    username: initialData?.username || '',
    password: initialData?.password || '',
    language: initialData?.language || '',
    systemPrompt: initialData?.systemPrompt,
    prompts: initialData?.prompts
  });

  const handlePromptChange = (label: string, content: string) => {
    if (label === 'system') {
      setFormData({ ...formData, systemPrompt: content });
      return;
    }

    setFormData({
      ...formData,
      prompts: formData.prompts?.map(prompt =>
        prompt.label === label
          ? {
              ...prompt,
              content,
              lastModified: new Date()
            }
          : prompt
      ) || [],
    });
  };

  const handleTogglePrompt = (label: string) => {
    setFormData({
      ...formData,
      prompts: formData.prompts?.map(prompt =>
        prompt.label === label
          ? { ...prompt, isActive: !prompt.isActive }
          : prompt
      ) || [],
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected
                ? 'bg-white text-indigo-700 shadow'
                : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'
              }`
            }
          >
            Basic Information
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected
                ? 'bg-white text-indigo-700 shadow'
                : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'
              }`
            }
          >
            Prompts
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Station Name
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
                  Station ID
                </label>
                <input
                  type="text"
                  value={formData.stationId}
                  onChange={(e) => setFormData({ ...formData, stationId: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                    focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  placeholder="e.g., 12 or sh5622d9"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Omniplayer URL
                </label>
                <input
                  type="url"
                  value={formData.omniplayerUrl}
                  onChange={(e) => setFormData({ ...formData, omniplayerUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                    focus:border-indigo-500 focus:ring-indigo-500"
                  required
                  placeholder="https://example.omniplayer.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client ID
                </label>
                <input
                  type="text"
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                    focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client Secret
                </label>
                <input
                  type="password"
                  value={formData.clientSecret}
                  onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                    focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                    focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                    focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                    focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a language</option>
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name} ({code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  value={formData.locationId?.toString()}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    locationId: parseInt(e.target.value) || 0 
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                    focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.city}, {location.country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                    focus:border-indigo-500 focus:ring-indigo-500"
                />
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
            </form>
          </Tab.Panel>

          <Tab.Panel>
            <div className="space-y-6">
              {/* System Prompt */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Prompt</h3>
                <textarea
                  rows={4}
                  value={formData.systemPrompt}
                  onChange={(e) => handlePromptChange('system', e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm p-3
                    focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter system prompt..."
                />
              </div>

              {/* Hourly Prompts */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hourly Prompts</h3>
                <div className="space-y-6">
                  {formData.prompts?.map((prompt) => (
                    <div key={prompt.label} className="space-y-2 border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={prompt.isActive}
                            onChange={() => handleTogglePrompt(prompt.label)}
                            className="rounded border-gray-300 text-indigo-600 
                              focus:ring-indigo-500 h-4 w-4 mr-2"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {TIME_SLOTS[prompt.label as keyof typeof TIME_SLOTS]}
                          </span>
                        </label>
                      </div>
                      <textarea
                        rows={3}
                        value={prompt.content}
                        onChange={(e) => handlePromptChange(prompt.label, e.target.value)}
                        className={`w-full rounded-md border shadow-sm p-3
                          ${prompt.isActive 
                            ? 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500' 
                            : 'border-gray-200 bg-gray-50 text-gray-500'
                          }`}
                        placeholder="Enter prompt for this time slot..."
                        disabled={!prompt.isActive}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

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
          {initialData ? 'Update Station' : 'Add Station'}
        </ShimmerButton>
      </div>
    </div>
  )
} 
import { useState } from 'react'
import { Station, StationPrompt } from '@/lib/types'

interface StationPromptsFormProps {
  station: Station;
  onSave: (prompts: StationPrompt[]) => void;
}

const HOURLY_PROMPTS = [
  'HH00', 'HH10', 'HH20', 'HH30', 'HH40', 'HH50', 'HH55'
] as const;

export default function StationPromptsForm({ station, onSave }: StationPromptsFormProps) {
  const [systemPrompt, setSystemPrompt] = useState(station.systemPrompt)
  const [hourlyPrompts, setHourlyPrompts] = useState<StationPrompt[]>(
    station.prompts || HOURLY_PROMPTS.map(label => ({
      id: `${station.id}-${label}`,
      label,
      content: '',
      isActive: true,
      lastModified: new Date(),
    }))
  )

  const handlePromptChange = (label: string, content: string) => {
    if (label === 'system') {
      setSystemPrompt(content)
    } else {
      setHourlyPrompts(prev => 
        prev.map(prompt => 
          prompt.label === label 
            ? { ...prompt, content, lastModified: new Date() }
            : prompt
        )
      )
    }
  }

  const handleTogglePrompt = (label: string) => {
    setHourlyPrompts(prev =>
      prev.map(prompt =>
        prompt.label === label
          ? { ...prompt, isActive: !prompt.isActive }
          : prompt
      )
    )
  }

  return (
    <div className="space-y-8">
      {/* System Prompt */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Prompt</h3>
        <div className="space-y-4">
          <textarea
            rows={4}
            value={systemPrompt}
            onChange={(e) => handlePromptChange('system', e.target.value)}
            className="w-full rounded-md border border-gray-300 shadow-sm p-3
              focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter system prompt..."
          />
        </div>
      </div>

      {/* Hourly Prompts */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Hourly Prompts</h3>
        <div className="space-y-6">
          {hourlyPrompts.map((prompt) => (
            <div key={prompt.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={prompt.isActive}
                    onChange={() => handleTogglePrompt(prompt.label)}
                    className="rounded border-gray-300 text-indigo-600 
                      focus:ring-indigo-500 h-4 w-4 mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {prompt.label}
                  </span>
                </label>
                <span className="text-xs text-gray-500">
                  Last modified: {new Date(prompt.lastModified).toLocaleString()}
                </span>
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
                placeholder={`Enter prompt for ${prompt.label}...`}
                disabled={!prompt.isActive}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onSave(hourlyPrompts)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 
            rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Prompts
        </button>
      </div>
    </div>
  )
} 
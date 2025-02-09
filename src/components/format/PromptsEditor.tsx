'use client'

import { useState } from 'react'
import { StationPrompt } from '@/lib/types'

interface PromptsEditorProps {
  prompts: {
    system: string;
    hourly: StationPrompt[];
  } | null;
  onSave: (prompts: { system: string; hourly: StationPrompt[] }) => void;
  onCancel: () => void;
}

export default function PromptsEditor({ prompts, onSave, onCancel }: PromptsEditorProps) {
  const [editedPrompts, setEditedPrompts] = useState(prompts)

  if (!editedPrompts) return null

  const handleSystemPromptChange = (value: string) => {
    setEditedPrompts({
      ...editedPrompts,
      system: value
    })
  }

  const handleHourlyPromptChange = (id: string, value: string) => {
    setEditedPrompts({
      ...editedPrompts,
      hourly: editedPrompts.hourly.map(prompt =>
        prompt.id === id ? { ...prompt, content: value } : prompt
      )
    })
  }

  const handleTogglePrompt = (id: string) => {
    setEditedPrompts({
      ...editedPrompts,
      hourly: editedPrompts.hourly.map(prompt =>
        prompt.id === id ? { ...prompt, isActive: !prompt.isActive } : prompt
      )
    })
  }

  return (
    <div className="space-y-6">
      {/* System Prompt */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          System Prompt
        </label>
        <textarea
          value={editedPrompts.system}
          onChange={(e) => handleSystemPromptChange(e.target.value)}
          rows={4}
          className="input-modern"
          placeholder="Enter system prompt..."
        />
      </div>

      {/* Hourly Prompts */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Hourly Prompts</h3>
        {editedPrompts.hourly.map((prompt) => (
          <div key={prompt.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={prompt.isActive}
                  onChange={() => handleTogglePrompt(prompt.id)}
                  className="rounded border-border text-primary focus:ring-primary mr-2"
                />
                <span className="text-sm font-medium text-foreground">
                  {prompt.label}
                </span>
              </label>
            </div>
            <textarea
              value={prompt.content}
              onChange={(e) => handleHourlyPromptChange(prompt.id, e.target.value)}
              rows={3}
              className={`input-modern ${!prompt.isActive && 'opacity-50'}`}
              placeholder={`Enter prompt for ${prompt.label}...`}
              disabled={!prompt.isActive}
            />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(editedPrompts)}
          className="btn-primary"
        >
          Save Prompts
        </button>
      </div>
    </div>
  )
} 
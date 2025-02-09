import { useState } from 'react'
import { StationPrompt } from '@/lib/types'
import { ShimmerButton } from "@/components/ui/shimmer-button"

interface GeneratedPrompts {
  system: string;
  hourly: StationPrompt[];
}

interface PromptsEditorProps {
  prompts: GeneratedPrompts | null;
  onSave: (prompts: GeneratedPrompts) => void;
  onCancel: () => void;
}

export default function PromptsEditor({ prompts, onSave, onCancel }: PromptsEditorProps) {
  const [editedPrompts, setEditedPrompts] = useState<GeneratedPrompts | null>(prompts)

  if (!editedPrompts) return null

  const handleSystemPromptChange = (content: string) => {
    setEditedPrompts({
      ...editedPrompts,
      system: content
    })
  }

  const handleHourlyPromptChange = (index: number, content: string) => {
    const updatedHourly = [...editedPrompts.hourly]
    updatedHourly[index] = {
      ...updatedHourly[index],
      content,
      lastModified: new Date()
    }
    setEditedPrompts({
      ...editedPrompts,
      hourly: updatedHourly
    })
  }

  return (
    <div className="space-y-6">
      {/* System Prompt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          System Prompt
        </label>
        <textarea
          rows={4}
          value={editedPrompts.system}
          onChange={(e) => handleSystemPromptChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 shadow-sm p-3
            focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter system prompt..."
        />
      </div>

      {/* Hourly Prompts */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Hourly Prompts</h3>
        <div className="space-y-4">
          {editedPrompts.hourly.map((prompt, index) => (
            <div key={prompt.id || index} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  {prompt.label}
                </label>
                <span className="text-xs text-gray-500">
                  Last modified: {new Date(prompt.lastModified).toLocaleString()}
                </span>
              </div>
              <textarea
                rows={3}
                value={prompt.content}
                onChange={(e) => handleHourlyPromptChange(index, e.target.value)}
                className="w-full rounded-md border border-gray-300 shadow-sm p-3
                  focus:border-indigo-500 focus:ring-indigo-500"
                placeholder={`Enter prompt for ${prompt.label}...`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <ShimmerButton
          onClick={onCancel}
          background="hsl(var(--muted))"
          className="shadow-lg"
        >
          Cancel
        </ShimmerButton>
        <ShimmerButton
          onClick={() => onSave(editedPrompts)}
          background="hsl(var(--primary))"
          className="shadow-lg"
        >
          Save Prompts
        </ShimmerButton>
      </div>
    </div>
  )
} 
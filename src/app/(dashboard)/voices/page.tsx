'use client'

import { useState } from 'react'
import { Voice } from '@/lib/types'
import { mockVoices, mockStations, mockLocations } from '@/lib/mockData'
import Modal from '@/components/ui/Modal'
import VoiceForm from '@/components/forms/VoiceForm'
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { COUNTRIES } from '@/lib/constants'

export default function VoicesPage() {
  const [voices, setVoices] = useState<Voice[]>(mockVoices)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingVoice, setEditingVoice] = useState<Voice | null>(null)

  const handleAddVoice = async (newVoice: Partial<Voice>) => {
    try {
      // Add voice logic here
      setIsAddModalOpen(false)
    } catch (error) {
      console.error('Failed to add voice:', error)
    }
  }

  const handleEditVoice = (updatedVoice: Partial<Voice>) => {
    setVoices(voices.map(voice => 
      voice.id === editingVoice?.id 
        ? { ...voice, ...updatedVoice }
        : voice
    ))
    setEditingVoice(null)
  }

  const handleDeleteVoice = (voiceId: string) => {
    if (confirm('Are you sure you want to delete this voice?')) {
      setVoices(voices.filter(voice => voice.id !== voiceId))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Voices</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Voice
        </button>
      </div>

      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Voice ID</th>
              <th>Category</th>
              <th>Language/Accent</th>
              <th>Country</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {voices.map((voice) => (
              <tr key={voice.id}>
                <td className="text-foreground font-medium">{voice.name}</td>
                <td className="text-muted-foreground">{voice.voiceId}</td>
                <td className="text-muted-foreground">{voice.category}</td>
                <td>
                  <div className="text-foreground">{voice.language}</div>
                  {voice.accent && (
                    <div className="text-muted-foreground text-sm">{voice.accent}</div>
                  )}
                </td>
                <td className="text-muted-foreground">
                  {COUNTRIES[voice.country as keyof typeof COUNTRIES]}
                </td>
                <td>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${voice.status === 'active' 
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {voice.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingVoice(voice)}
                      className="p-2 hover:text-primary"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteVoice(voice.id)}
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
        title="Add New Voice"
      >
        <VoiceForm
          onSubmit={handleAddVoice}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingVoice}
        onClose={() => setEditingVoice(null)}
        title="Edit Voice"
      >
        <VoiceForm
          initialData={editingVoice || undefined}
          onSubmit={handleEditVoice}
          onCancel={() => setEditingVoice(null)}
        />
      </Modal>
    </div>
  )
} 
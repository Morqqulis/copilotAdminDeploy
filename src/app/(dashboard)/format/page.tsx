'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchApi } from '@/lib/api'
import LoadingWrapper from '@/components/ui/LoadingWrapper'
import FormatSpiderChart from '@/components/stations/FormatSpiderChart'
import FormatSliders from '@/components/stations/FormatSliders'
import FormatPreview from '@/components/stations/FormatPreview'
import Button from '@/components/ui/Button'
import { Station, StationPrompt } from '@/lib/types'
import Modal from '@/components/ui/Modal'
import { PlusIcon } from '@heroicons/react/24/outline'
import PromptsEditor from '@/components/prompts/PromptsEditor'
import { ShimmerButton } from "@/components/ui/shimmer-button"

interface FormatData {
  demographic: {
    x: number
    y: number
  }
  sliders: {
    incomeLevel: number
    brandAffinity: number
    culturalInfluence: number
    socialEngagement: number
  }
}

interface GeneratedPrompts {
  system: string;
  hourly: StationPrompt[];
}

export default function FormatCustomizerPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const [formatData, setFormatData] = useState<FormatData>({
    demographic: { x: 50, y: 50 },
    sliders: {
      incomeLevel: 50,
      brandAffinity: 50,
      culturalInfluence: 50,
      socialEngagement: 50,
    }
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPromptsModal, setShowPromptsModal] = useState(false)
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompts | null>(null)

  useEffect(() => {
    fetchStations()
  }, [])

  const fetchStations = async () => {
    try {
      const response = await fetch('/api/stations')
      if (!response.ok) throw new Error('Failed to fetch stations')
      const data = await response.json()
      setStations(data)
    } catch (error) {
      console.error('Error fetching stations:', error)
    }
  }

  const handleSave = async () => {
    if (!selectedStation) {
      alert('Please select a station first')
      return
    }

    try {
      // TODO: Implement save functionality
      console.log('Saving format data for station:', selectedStation.id, formatData)
    } catch (error) {
      console.error('Failed to save format:', error)
    }
  }

  const handleGeneratePrompts = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/prompts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format: 'CHR', // Could be made dynamic
          language: 'en'
        })
      })
      
      const data = await response.json()
      setGeneratedPrompts(data)
      setShowPromptsModal(true)
    } catch (error) {
      console.error('Failed to generate prompts:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSavePrompts = async (updatedPrompts: GeneratedPrompts) => {
    try {
      await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPrompts)
      })
      setShowPromptsModal(false)
    } catch (error) {
      console.error('Failed to save prompts:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Format Customizer</h1>
          <p className="text-muted-foreground mt-2">
            Customize your station's format by adjusting the demographic target and style parameters
          </p>
        </div>
      </div>

      {/* Station Selector */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Select Station</h2>
        <div className="flex gap-4 items-center">
          <select
            value={selectedStation?.id || ''}
            onChange={(e) => {
              const station = stations.find(s => s.id === parseInt(e.target.value))
              setSelectedStation(station || null)
            }}
            className="bg-background text-foreground border border-input rounded-md px-3 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a station...</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedStation ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Spider Chart Section */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Demographic Targeting</h2>
              <FormatSpiderChart
                data={formatData.demographic}
                onChange={(demographic) => setFormatData({ ...formatData, demographic })}
              />
            </div>

            {/* Sliders Section */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Style Parameters</h2>
              <FormatSliders
                values={formatData.sliders}
                onChange={(sliders) => setFormatData({ ...formatData, sliders })}
              />
            </div>
          </div>

          {/* Format Preview and Actions */}
          <div className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">Format Preview</h2>
              <div className="flex gap-4">
                <ShimmerButton
                  onClick={handleGeneratePrompts}
                  disabled={isGenerating}
                  className="shadow-lg"
                  background="hsl(var(--primary))"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <PlusIcon className="h-5 w-5" />
                      Generate Prompts
                    </span>
                  )}
                </ShimmerButton>
                <Button 
                  onClick={handleSave}
                  variant="outline"
                >
                  Save Format
                </Button>
              </div>
            </div>
            <FormatPreview formatData={formatData} />
          </div>
        </>
      ) : (
        <div className="card p-6 text-center text-muted-foreground">
          Please select a station to customize its format
        </div>
      )}

      <Modal
        isOpen={showPromptsModal}
        onClose={() => setShowPromptsModal(false)}
        title="Generated Prompts"
      >
        <PromptsEditor
          prompts={generatedPrompts}
          onSave={handleSavePrompts}
          onCancel={() => setShowPromptsModal(false)}
        />
      </Modal>
    </div>
  )
} 
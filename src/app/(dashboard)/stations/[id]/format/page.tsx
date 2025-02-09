'use client'

import { useState } from 'react'
import { Radar } from 'recharts'
import FormatSpiderChart from '@/components/stations/FormatSpiderChart'
import FormatSliders from '@/components/stations/FormatSliders'
import FormatPreview from '@/components/stations/FormatPreview'

interface FormatData {
  demographic: {
    x: number // Conservative (0) ↔ Experimental (100)
    y: number // Older (0) ↔ Younger (100)
  }
  sliders: {
    incomeLevel: number
    brandAffinity: number
    culturalInfluence: number
    socialEngagement: number
  }
}

export default function FormatCustomizerPage() {
  const [formatData, setFormatData] = useState<FormatData>({
    demographic: { x: 50, y: 50 },
    sliders: {
      incomeLevel: 50,
      brandAffinity: 50,
      culturalInfluence: 50,
      socialEngagement: 50,
    }
  })

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

      {/* Format Preview */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Format Preview</h2>
        <FormatPreview formatData={formatData} />
      </div>
    </div>
  )
} 
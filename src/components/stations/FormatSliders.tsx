'use client'

import { Station } from '@/lib/types'

interface FormatSlidersProps {
  values: {
    incomeLevel: number
    brandAffinity: number
    culturalInfluence: number
    socialEngagement: number
  }
  onChange: (values: FormatSlidersProps['values']) => void
}

export default function FormatSliders({ values, onChange }: FormatSlidersProps) {
  const sliders = [
    {
      id: 'incomeLevel',
      label: 'Income Level',
      left: 'Budget',
      right: 'Luxury',
    },
    {
      id: 'brandAffinity',
      label: 'Brand Affinity',
      left: 'Mass Market',
      right: 'Premium',
    },
    {
      id: 'culturalInfluence',
      label: 'Cultural Influence',
      left: 'Local',
      right: 'Global',
    },
    {
      id: 'socialEngagement',
      label: 'Social Engagement',
      left: 'Introvert',
      right: 'Extrovert',
    },
  ]

  return (
    <div className="space-y-6">
      {sliders.map((slider) => (
        <div key={slider.id} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{slider.left}</span>
            <span className="font-medium">{slider.label}</span>
            <span className="text-muted-foreground">{slider.right}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={values[slider.id as keyof typeof values]}
            onChange={(e) => {
              onChange({
                ...values,
                [slider.id]: parseInt(e.target.value)
              })
            }}
            className="w-full accent-primary"
          />
        </div>
      ))}
    </div>
  )
} 
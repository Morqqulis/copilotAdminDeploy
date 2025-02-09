import { Station } from '@/lib/types'

interface FormatPreviewProps {
  formatData: {
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
}

export default function FormatPreview({ formatData }: FormatPreviewProps) {
  const { demographic, sliders } = formatData
  
  // Calculate recommendations based on format data
  const recommendations = {
    hostStyle: demographic.y > 50 
      ? 'Casual and energetic, using contemporary language'
      : 'Professional and structured delivery',
    
    contentFormat: demographic.x > 50
      ? 'Innovative segments with viral potential'
      : 'Traditional radio formats with proven success',
    
    interactionStyle: sliders.socialEngagement > 50
      ? 'Heavy social media integration and live interaction'
      : 'Traditional call-ins and structured engagement',
    
    musicPolicy: `${demographic.y > 50 ? 'Current hits' : 'Classic favorites'} with 
      ${demographic.x > 50 ? 'experimental' : 'mainstream'} programming`,
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(recommendations).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <p className="text-sm text-muted-foreground">{value}</p>
        </div>
      ))}
    </div>
  )
} 
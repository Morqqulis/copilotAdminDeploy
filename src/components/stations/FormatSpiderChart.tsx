'use client'

import { useRef, useState } from 'react'
import { Station } from '@/lib/types'

interface FormatSpiderChartProps {
  data: {
    x: number
    y: number
  }
  onChange: (data: { x: number; y: number }) => void
}

export default function FormatSpiderChart({ data, onChange }: FormatSpiderChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const size = 400
  const center = size / 2
  const radius = (size / 2) - 40

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging || !svgRef.current) return

    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Convert coordinates to percentages
    const newX = Math.max(0, Math.min(100, ((x - (center - radius)) / (radius * 2)) * 100))
    const newY = Math.max(0, Math.min(100, (1 - ((y - (center - radius)) / (radius * 2))) * 100))

    onChange({ x: newX, y: newY })
  }

  // Calculate point position
  const pointX = center - radius + (data.x / 100) * radius * 2
  const pointY = center + radius - (data.y / 100) * radius * 2

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      className="touch-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      {/* Background */}
      <rect
        x={0}
        y={0}
        width={size}
        height={size}
        fill="transparent"
      />

      {/* Grid Lines */}
      <line
        x1={center}
        y1={center - radius}
        x2={center}
        y2={center + radius}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={1}
      />
      <line
        x1={center - radius}
        y1={center}
        x2={center + radius}
        y2={center}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={1}
      />

      {/* Labels */}
      <text
        x={center + radius - 40}
        y={center - 20}
        fill="white"
        fontSize={12}
      >
        Experimental
      </text>
      <text
        x={center - radius - 40}
        y={center - 20}
        fill="white"
        fontSize={12}
      >
        Conservative
      </text>
      <text
        x={center - 20}
        y={center - radius - 20}
        fill="white"
        fontSize={12}
        textAnchor="middle"
      >
        Younger
      </text>
      <text
        x={center - 20}
        y={center + radius + 20}
        fill="white"
        fontSize={12}
        textAnchor="middle"
      >
        Older
      </text>

      {/* Current Position */}
      <circle
        cx={pointX}
        cy={pointY}
        r={8}
        fill="#ef4444"
        className="cursor-move"
        onMouseDown={handleMouseDown}
      />

      {/* Quadrant Labels */}
      <text
        x={center + radius/2}
        y={center - radius/2}
        fill="rgba(255,255,255,0.5)"
        fontSize={10}
        textAnchor="middle"
      >
        Modern & Youth-Focused
      </text>
      <text
        x={center - radius/2}
        y={center - radius/2}
        fill="rgba(255,255,255,0.5)"
        fontSize={10}
        textAnchor="middle"
      >
        Traditional & Youth-Focused
      </text>
      <text
        x={center + radius/2}
        y={center + radius/2}
        fill="rgba(255,255,255,0.5)"
        fontSize={10}
        textAnchor="middle"
      >
        Modern & Mature
      </text>
      <text
        x={center - radius/2}
        y={center + radius/2}
        fill="rgba(255,255,255,0.5)"
        fontSize={10}
        textAnchor="middle"
      >
        Traditional & Mature
      </text>
    </svg>
  )
} 
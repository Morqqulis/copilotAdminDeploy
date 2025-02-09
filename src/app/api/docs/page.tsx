'use client'

import { useEffect } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { swaggerDoc } from './swagger'

export default function ApiDocs() {
  return (
    <div className="container mx-auto py-6">
      <SwaggerUI spec={swaggerDoc} />
    </div>
  )
} 
export interface Station {
  id: number
  name: string
  locationId: number
  omniplayerUrl: string
  clientId: string
  clientSecret: string
  username: string
  password: string
  language: string
  website?: string
  logo?: string
  status: string
  systemPrompt?: string
  prompts?: any
  createdAt?: Date
} 
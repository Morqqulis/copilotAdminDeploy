export interface StationPrompt {
	id: string
	label: string
	content: string
	isActive: boolean
	lastModified: Date
}

export interface Client {
	id: number
	name: string
	email: string
	company: string
	website?: string
	logo?: string
	status: 'active' | 'inactive'
	stationIds: number[]
	createdAt: Date
	updatedAt: Date
}

export interface Station {
	id: number
	name: string
	stationId: string
	locationId: number
	omniplayerUrl: string
	clientId: string
	clientSecret: string
	username: string
	password: string
	language: string
	website: string
	logo?: string
	status: 'active' | 'inactive'
	systemPrompt?: string
	prompts?: StationPrompt[]
	format?: {
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
	createdAt: Date
}

export interface Location {
	id: number
	name: string
	city: string
	country: string
	timezone: string
	createdAt: Date
}

export interface Voice {
	id: string
	name: string
	voiceId: string
	gender: 'male' | 'female'
	language: string
	accent?: string
	age?: number
	category: string
	description?: string
	samples?: string[]
	status: 'active' | 'inactive'
	country: string
	createdAt: Date
}

export interface Settings {
	id: string
	apiKey?: string
	webhookUrl?: string
	createdAt: Date
	updatedAt: Date
}

export type VoiceCategory = 'voicetracking' | 'news' | 'caller'

// ... other interfaces remain the same

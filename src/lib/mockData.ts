import { Station } from '@/types'
import { Client, Voice } from './types'

export const mockLocations = [
	{
		id: 1,
		name: 'New York',
		country: 'US',
		city: 'New York',
		timezone: 'America/New_York',
	},
	{
		id: 2,
		name: 'London',
		country: 'GB',
		city: 'London',
		timezone: 'Europe/London',
	},
]

export const mockStations: Station[] = [
	{
		id: 1,
		stationId: 'sh5622d9',
		name: 'Radio NYC',
		locationId: 1,
		omniplayerUrl: 'https://nyc.omniplayer.com',

		clientId: 'nyc_client',
		clientSecret: 'nyc_secret',
		username: 'nyc_user',
		password: 'nyc_pass',
		language: 'en',
		website: 'www.radionyc.com',
		status: 'active',
		createdAt: new Date(),
		prompts: [],
		systemPrompt: 'You are a radio host for Radio NYC...',
	},
	{
		id: 2,
		stationId: '12',
		name: 'London FM',
		locationId: 2,
		omniplayerUrl: 'https://london.omniplayer.com',
		clientId: 'london_client',
		clientSecret: 'london_secret',

		username: 'london_user',
		password: 'london_pass',
		language: 'en',
		website: 'www.londonfm.co.uk',
		status: 'active',
		createdAt: new Date(),
		prompts: [],
		systemPrompt: 'You are a radio host for London FM...',
	},
]

export const mockVoices: Voice[] = [
	{
		id: '1',
		voiceId: 'pQB83Phx1CmQQkTQxu6o',
		name: 'John Smith',
		gender: 'male',
		language: 'English',
		accent: 'American',
		country: 'US',
		category: 'voicetracking',
		samples: [],
		status: 'active',
		createdAt: new Date(),
	},
	{
		id: '2',
		voiceId: 'kLM92Nhy5DpRRvSWxn7p',
		name: 'Emma Wilson',
		gender: 'female',
		language: 'English',
		accent: 'British',
		country: 'GB',
		category: 'news',
		samples: [],
		status: 'active',
		createdAt: new Date(),
	},
]

export const mockClients: Client[] = [
	{
		id: 1,
		name: 'John Media Group',
		email: 'contact@johnmedia.com',
		company: 'John Media Holdings',
		status: 'active',
		stationIds: [1],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 2,
		name: 'London Broadcasting',
		email: 'info@londonbroadcasting.co.uk',
		company: 'London Broadcasting Ltd',
		status: 'active',
		stationIds: [2],
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]

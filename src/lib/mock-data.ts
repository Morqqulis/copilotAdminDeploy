export const mockClients = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@radioone.com',
    company: 'Radio One',
    website: 'https://radioone.com',
    logo: '/logos/radio-one.png',
    stationIds: [1, 2],
    status: 'active' as const,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@mediagroup.com',
    company: 'Media Group',
    website: 'https://mediagroup.com',
    stationIds: [3],
    status: 'active' as const,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const mockStations: Station[] = [
  {
    id: 1,
    name: "Radio One",
    stationId: "RAD1",
    locationId: 1,
    website: "https://radioone.com",
    status: "active",
    format: {
      demographic: { x: 50, y: 50 },
      sliders: {
        incomeLevel: 50,
        brandAffinity: 50,
        culturalInfluence: 50,
        socialEngagement: 50
      }
    }
  }
]

export const mockLocations: Location[] = [
  {
    id: 1,
    name: "New York Studio",
    city: "New York",
    country: "United States",
    timezone: "America/New_York"
  }
]

export const mockVoices: Voice[] = [
  {
    id: "1",
    name: "John Smith",
    voiceId: "en-US-1",
    gender: "male",
    language: "en-US",
    accent: "American",
    age: 35,
    category: "news",
    country: "United States",
    status: "active",
    createdAt: new Date()
  }
] 
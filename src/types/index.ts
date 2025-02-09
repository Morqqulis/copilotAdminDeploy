export interface Location {
  id: number;
  name: string;
  country: string;
  city: string;
  timezone: string;
  createdAt: Date;
}

export interface StationPrompt {
  label: string;
  content: string;
  isActive: boolean;
  lastModified: Date;
}

export interface Station {
  id: number;
  name: string;
  locationId: number;
  omniplayerUrl: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  language: string;
  website?: string;
  logo?: string;
  status: string;
  systemPrompt?: string;
  prompts?: any;
  createdAt: Date;
}

export type VoiceCategory = 'voicetracking' | 'news' | 'weather' | 'traffic'

export interface Voice {
  id: number;
  voiceId: string;
  name: string;
  gender: string;
  language: string;
  country: string;
  category: string;
  status: string;
  createdAt: Date;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  company: string;
  website?: string;
  logo?: string;
  status: 'active' | 'inactive';
  stationIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  id: string;
  apiKey?: string;
  webhookUrl?: string;
  createdAt: Date;
  updatedAt: Date;
} 
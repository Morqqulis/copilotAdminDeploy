import { z } from 'zod'

export const stationSchema = z.object({
  name: z.string().min(1),
  locationId: z.number(),
  omniplayer_id: z.string().min(1),
  language: z.string().min(1),
  website: z.string().optional(),
  status: z.enum(['active', 'inactive']),
  systemPrompt: z.string(),
  prompts: z.array(z.object({
    id: z.string(),
    label: z.string(),
    content: z.string(),
    isActive: z.boolean(),
    lastModified: z.date()
  }))
}) 
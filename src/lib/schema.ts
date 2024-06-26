import { string, z } from 'zod'

export const FormDataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  description: z.string().min(1, 'Description is required'),
  startDate: z.date(),
  endDate: z.date(),
  eventOrganiser: z.string().min(1, 'Event organiser is required'),
})

export type ValidFieldNames =
  | "title"
  | "shortDescription"
  | "description"
  | "startDate"
  | "endDate"
  | "eventOrganiser";
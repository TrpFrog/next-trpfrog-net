import { z } from 'zod'

export const imageGenerationPromptSchema = z.object({
  author: z.string(),
  text: z.string(),
  translated: z.string(),
})

export const generatedImageSchema = z.object({
  modelName: z.string(),
  extension: z.string(),
  image: z.instanceof(ArrayBuffer),
})

export const imageMetadataSchema = z.object({
  id: z.string(),
  prompt: imageGenerationPromptSchema,
  modelName: z.string(),
  createdAt: z.date(),
  deletedAt: z.date().optional(),
  imageUri: z.string().url(),
})

export type ImagePrompt = z.infer<typeof imageGenerationPromptSchema>
export type ImageMetadata = z.infer<typeof imageMetadataSchema>
export type GeneratedImage = z.infer<typeof generatedImageSchema>

export function parseImageMetadata(record: ImageMetadata | string): ImageMetadata {
  if (typeof record === 'string') {
    return imageMetadataSchema.parse(JSON.parse(record))
  } else {
    return imageMetadataSchema.parse(record)
  }
}

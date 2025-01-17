import { TextToImage } from '../domain/services/text-to-image'

export function generateImageUseCase(deps: { textToImage: TextToImage }) {
  return async (prompt: string, options: { numberOfRetries: number }) => {
    const numberOfRetries = options?.numberOfRetries ?? 1
    for (const _ of Array.from(Array(numberOfRetries))) {
      try {
        return await deps.textToImage(prompt)
      } catch (e) {
        console.error(e)
      }
    }
    throw new Error('Failed to generate image')
  }
}

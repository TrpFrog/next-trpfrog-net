import { services } from '@trpfrog.net/constants'
import { hc } from 'hono/client'

export {
  TrpFrogImageGenerationResultSchema,
  type ImageGenerationResult as TrpFrogImageGenerationResult,
} from './domain/entities/generation-result'

import type { AppType } from './controller'

export function createTrpFrogImageGenerationClient(env: 'development' | 'production' | 'test') {
  const origin = services.imageGeneration.origin(env)
  if (origin == null) {
    throw new Error('Image generation service is not available in this environment')
  }
  return hc<AppType>(origin).icongen
}

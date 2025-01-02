'use server'

import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import dedent from 'ts-dedent'
import { z } from 'zod'

import { env } from '@/env/server'

export async function generateAltTextOnServer(image: ArrayBuffer): Promise<string> {
  if (env.NODE_ENV !== 'development') {
    throw new Error('Forbidden')
  }

  if (!env.OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API key in environment variables')
  }

  const { object: output } = await generateObject({
    model: openai('gpt-4o-2024-11-20'),
    schema: z.object({
      altText: z.string().describe('Japanese alt text for the image'),
    }),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: dedent`
              Based on the provided image, generate an alt text in Japanese.
              The alt text should accurately describe the content of the image and provide useful information to enhance accessibility.
              The alt text should be 30 - 50 characters long in Japanese.
            `,
          },
          {
            type: 'image',
            image,
          },
        ],
      },
    ],
  })

  return output.altText
}

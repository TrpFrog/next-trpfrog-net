import React from 'react'

import { ImageResponseOptions } from 'next/dist/compiled/@vercel/og/types'
import { ImageResponse, NextRequest, NextResponse } from 'next/server'

import { fetchFont } from '@/lib/fetchFont'

import { ogFonts, ogpImageSize } from '@blog/[slug]/og-image/variables'

import {
  OgAttribute,
  OgAttributesWrapper,
  OgBody,
  OgGradientBackground,
  OgThumbnail,
  OgTitle,
  OgTrpFrogIcon,
  OgWhiteBackground,
  OgWindow,
} from './components'
import { fetchArticle } from './fetchArticle'

export const runtime = 'edge'

async function createImageResponseOptions() {
  const imageResponseOptions: ImageResponseOptions = {
    ...ogpImageSize,
    fonts: [],
  }

  // load fonts
  try {
    for (const font of Object.values(ogFonts)) {
      const fontData = await fetchFont(font.name, font.weight)
      imageResponseOptions.fonts?.push({
        name: font.name,
        data: fontData,
        style: 'normal',
      })
    }
  } catch (e) {
    console.error('Failed to fetch font')
    console.error(e)
  }

  return imageResponseOptions
}

type Context = {
  params: {
    slug: string
  }
}

export async function GET(req: NextRequest, context: Context) {
  const slug = context.params.slug
  const res = await fetchArticle(slug)
  if (res instanceof NextResponse) {
    return res
  }
  const { title, thumbnail, tags, date } = res

  const imageResponseOptions = await createImageResponseOptions()

  const Background = thumbnail ? OgGradientBackground : OgWhiteBackground

  return new ImageResponse(
    (
      <OgBody>
        <OgWindow>
          <OgThumbnail src={thumbnail} />
          <Background>
            <OgTitle>{title}</OgTitle>
          </Background>
          <OgAttributesWrapper>
            <OgAttribute>{date}</OgAttribute>
            {tags.map(tag => (
              <OgAttribute key={tag}>#{tag}</OgAttribute>
            ))}
          </OgAttributesWrapper>
        </OgWindow>
        <OgTrpFrogIcon size={100} pos={{ x: 38, y: 38 }} />
      </OgBody>
    ),
    imageResponseOptions,
  )
}

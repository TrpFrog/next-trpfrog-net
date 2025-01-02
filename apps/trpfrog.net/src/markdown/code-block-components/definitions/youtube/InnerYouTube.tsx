'use client'

import { memo } from 'react'

import ReactPlayer from 'react-player/youtube'

import { YouTube } from '@/components/organisms/YouTube'

export const InnerYouTube = memo(function InnerYouTube({ content }: { content: string }) {
  const lines = content.split('\n')
  const [id, rawParams] = lines[0].trim().split('?')
  const params = new URLSearchParams(rawParams)

  // if playlist parameter is not set, youtube will not loop the video
  if (params.has('loop') && !params.has('playlist')) {
    params.set('playlist', id)
  }

  return <YouTube videoId={id} params={params.toString()} />
})

export const InnerAutoYouTube = memo(function InnerAutoYouTube({ content }: { content: string }) {
  const lines = content.split('\n')
  const id = lines[0].trim()
  // const title = lines[1]?.trim()
  return (
    <div className="tw-flex tw-items-center tw-justify-center">
      <ReactPlayer
        url={'https://www.youtube.com/watch?v=' + id}
        playing={true}
        volume={0}
        config={{
          playerVars: {
            modestbranding: 1,
            loop: 1,
            playlist: id, // it is needed to loop video
          },
        }}
      />
    </div>
  )
})

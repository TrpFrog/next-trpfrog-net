import { useCallback } from 'react'

import dedent from 'ts-dedent'
import { useImmerReducer } from 'use-immer'

function uploadingStateImmerReducer(
  draft: { isFinished: boolean; total: number; altProgress: number; uploadProgress: number },
  action:
    | { type: 'append'; altProgress?: number; uploadProgress?: number }
    | { type: 'start'; total: number }
    | { type: 'finish' },
) {
  switch (action.type) {
    case 'start':
      draft.isFinished = false
      draft.total = action.total
      draft.altProgress = 0
      draft.uploadProgress = 0
      return
    case 'append':
      draft.altProgress += action.altProgress ?? 0
      draft.uploadProgress += action.uploadProgress ?? 0
      return
    case 'finish':
      draft.isFinished = true
  }
}

export function useImageUploadUsecase(deps: {
  generateAltText: (arrayBuffer: ArrayBuffer) => Promise<string>
  uploadImage: (file: File) => Promise<string>
}) {
  const { generateAltText, uploadImage } = deps
  const [uploadingStatus, updateUploadingStatus] = useImmerReducer(uploadingStateImmerReducer, {
    isFinished: true,
    total: 0,
    altProgress: 0,
    uploadProgress: 0,
  })

  const upload = useCallback(
    async (files: File[]) => {
      updateUploadingStatus({ type: 'start', total: files.length })

      const result = await Promise.all(
        files.map(async file => {
          const [path, alt] = await Promise.all([
            // upload image
            uploadImage(file).then(path => {
              updateUploadingStatus({ type: 'append', uploadProgress: 1 })
              return path
            }),
            // generate alt text
            file
              .arrayBuffer()
              .then(generateAltText)
              .then(alt => {
                updateUploadingStatus({ type: 'append', altProgress: 1 })
                return alt
              }),
          ])
          return { path, alt }
        }),
      )

      updateUploadingStatus({ type: 'finish' })
      return result.map(e => ({
        ...e,
        markdown: `![${e.alt}](${e.path})`,
      }))
    },
    [generateAltText, updateUploadingStatus, uploadImage],
  )

  const uploadingStatusText = uploadingStatus.isFinished
    ? null
    : dedent`
      Alt Generation: ${uploadingStatus.altProgress}/${uploadingStatus.total}
        Image Upload: ${uploadingStatus.uploadProgress}/${uploadingStatus.total}
    `

  return {
    uploadingStatusText,
    uploadingStatus,
    upload,
  }
}

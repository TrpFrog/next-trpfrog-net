import { useCallback } from 'react'

import toast from 'react-hot-toast'

import { uploadToCloudinaryOnServer } from '@blog/_components/DevBlogMarkdown/actions/uploadToCloudinaryOnServer'

export function useUploadFunction(slug: string) {
  return useCallback(
    async (file: File) => {
      const formData = new FormData()
      formData.append('image', file)
      const uploadPromise = uploadToCloudinaryOnServer(formData, slug)

      const { public_id, format, width, height } = await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: <b>Uploaded!</b>,
        error: <b>Something went wrong...</b>,
      })
      return `/${public_id}.${format}?w=${width}&h=${height}` as const
    },
    [slug],
  )
}

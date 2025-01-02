'use server'

import { UploadApiOptions, UploadApiResponse } from 'cloudinary'

import { env } from '@/env/server'

import { cloudinary } from '@/lib/cloudinary'

// Promise wrapper for cloudinary.uploader.upload_stream
function cloudinaryUploaderPromise(
  file: File,
  options?: UploadApiOptions,
): Promise<UploadApiResponse> {
  // due to cloudinary.uploader.upload_stream's callback-based API,
  // we need to wrap it in a promise
  return new Promise<UploadApiResponse>((resolve, reject) => {
    // create upload stream
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (result) {
        resolve(result)
      } else {
        reject(error)
      }
    })

    // pipe file stream to upload stream
    const sendImage = async () => {
      const reader = file.stream().getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        uploadStream.write(value)
      }
      uploadStream.end()
    }

    sendImage().catch(reject)
  })
}

/**
 * Uploads a file to Cloudinary using the Cloudinary SDK.
 * @param formData FormData with a file named 'image'
 * @param slug
 */
export async function uploadToCloudinaryOnServer(
  formData: FormData,
  slug: string,
): Promise<UploadApiResponse> {
  if (env.NODE_ENV !== 'development') {
    throw new Error('Forbidden')
  }

  const file = formData.get('image') as File

  if (!file) {
    throw new Error('Bad Request')
  }

  const publicId = file.name.split('.').slice(0, -1).join('-').replaceAll(' ', '_')

  if (slug.startsWith('_')) {
    slug = slug.slice(1)
  }

  return await cloudinaryUploaderPromise(file, {
    public_id: publicId,
    overwrite: true,
    invalidate: true,
    resource_type: 'image',
    folder: `blog/${slug}`,
  })
}

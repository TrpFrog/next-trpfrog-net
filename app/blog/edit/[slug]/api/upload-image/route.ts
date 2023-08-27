import {NextResponse} from "next/server";
import cloudinary from "@/lib/cloudinary";
import type {UploadApiResponse} from "cloudinary";

type Context = {
  params: {
    slug: string
  }
}

type SuccessResponse = {
  success: true
  data: UploadApiResponse
}

type ErrorResponse = {
  success: false
  error: string
}

export type UploadResponse = SuccessResponse | ErrorResponse

export async function POST(req: Request, context: Context): Promise<NextResponse<UploadResponse>> {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({
      success: false,
      error: "Forbidden"
    }, {status: 403})
  }

  try {
    const form = await req.formData()
    const file = form.get('image') as {
      name: string
      stream: () => ReadableStream<Uint16Array>
    } | null

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "Bad Request"
      }, {status: 400})
    }

    const publicId = file.name
      .split('.')
      .slice(0, -1)
      .join('-')
      .replaceAll(' ', '_')

    const uploadApiResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        resource_type: 'image',
        folder: `blog/${context.params.slug}`
      }, (error, result) => {
        if (result) {
          resolve(result)
        } else {
          reject(error)
        }
      })

      const sendImage = async () => {
        const reader = file.stream().getReader()
        while (true) {
          const {done, value} = await reader.read()
          if (done) break
          uploadStream.write(value)
        }
        uploadStream.end()
      }
      sendImage().catch(reject)
    })

    return NextResponse.json({
      success: true,
      data: uploadApiResponse
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, {status: 500})
  }
}
import cloudinary from '@/lib/cloudinary'
import streamifier from 'streamifier'

export const uploadToCloudinary = async ({ req, data }: any) => {
  try {
    const file = req.file

    if (!file || !file.data) {
      console.log('No file found')
      return data
    }

    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'nestormind-blog',
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )

      streamifier.createReadStream(file.data).pipe(stream)
    })

    data.cloudinaryUrl = result.secure_url
    data.publicId = result.public_id

    console.log('Cloudinary Success:', result.secure_url)

    return data
  } catch (error) {
    console.error('========== CLOUDINARY ERROR ==========')
    console.error(error)
    throw error
  }
}

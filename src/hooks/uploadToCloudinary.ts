import cloudinary from '@/lib/cloudinary'

export const uploadToCloudinary = async ({ req, data }: any) => {
  const file = req.file

  if (!file) return data

  const result = await cloudinary.uploader.upload(file.tempFilePath || file.path, {
    folder: 'nestormind-blog',
  })

  data.cloudinaryUrl = result.secure_url
  data.publicId = result.public_id

  return data
}

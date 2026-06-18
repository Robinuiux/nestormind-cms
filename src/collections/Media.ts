import type { CollectionConfig } from 'payload'
import { uploadToCloudinary } from '../hooks/uploadToCloudinary'

export const Media: CollectionConfig = {
  slug: 'media',

  upload: {
    staticDir: 'media',
  },

  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },

  hooks: {
    beforeChange: [uploadToCloudinary],
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'publicId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
}

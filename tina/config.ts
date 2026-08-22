import { defineConfig } from 'tinacms'

const branch = process.env.HEAD || process.env.GITHUB_REF_NAME || 'main'

export default defineConfig({
  branch,
  clientId:
    process.env.TINA_PUBLIC_CLIENT_ID ||
    (process.env.GITHUB_PAGES === 'true' ? undefined : 'local'),
  token:
    process.env.TINA_TOKEN || (process.env.GITHUB_PAGES === 'true' ? undefined : 'local'),
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
    basePath: process.env.GITHUB_PAGES === 'true' ? 'relational-design' : '',
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: '',
    },
  },
  schema: {
    collections: [
      {
        name: 'page',
        label: 'Pages',
        path: 'Content',
        format: 'md',
        match: {
          include: '*.md',
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
})

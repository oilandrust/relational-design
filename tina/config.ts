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
        label: 'Home',
        path: 'content/pages',
        format: 'json',
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'siteName',
            label: 'Site name',
            required: true,
          },
          {
            type: 'string',
            name: 'email',
            label: 'Email',
            required: true,
          },
          {
            type: 'object',
            name: 'nav',
            label: 'Navigation',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || 'Link' }),
            },
            fields: [
              { type: 'string', name: 'label', label: 'Label', required: true },
              { type: 'string', name: 'href', label: 'Href', required: true },
            ],
          },
          {
            type: 'object',
            name: 'hero',
            label: 'Hero',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'title', label: 'Title', required: true },
              {
                type: 'string',
                name: 'body',
                label: 'Body',
                ui: { component: 'textarea' },
              },
              { type: 'string', name: 'primaryCta', label: 'Primary button' },
              { type: 'string', name: 'secondaryCta', label: 'Secondary button' },
              {
                type: 'string',
                name: 'secondaryHref',
                label: 'Secondary button link',
              },
            ],
          },
          {
            type: 'object',
            name: 'howIWork',
            label: 'How I work',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'title', label: 'Title', required: true },
              {
                type: 'object',
                name: 'steps',
                label: 'Steps',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title || 'Step' }),
                },
                fields: [
                  { type: 'string', name: 'title', label: 'Title', required: true },
                  {
                    type: 'string',
                    name: 'body',
                    label: 'Body',
                    ui: { component: 'textarea' },
                  },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'work',
            label: 'Work',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'title', label: 'Title', required: true },
              {
                type: 'object',
                name: 'projects',
                label: 'Projects',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title || 'Project' }),
                },
                fields: [
                  { type: 'string', name: 'title', label: 'Title', required: true },
                  { type: 'string', name: 'role', label: 'Role' },
                  { type: 'string', name: 'href', label: 'URL', required: true },
                  { type: 'string', name: 'display', label: 'Display URL' },
                  { type: 'image', name: 'image', label: 'Image' },
                  { type: 'string', name: 'alt', label: 'Image alt text' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'about',
            label: 'About',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'title', label: 'Title', required: true },
              {
                type: 'string',
                name: 'paragraphs',
                label: 'Paragraphs',
                list: true,
                ui: { component: 'textarea' },
              },
              {
                type: 'object',
                name: 'tools',
                label: 'Tools',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.name || 'Tool' }),
                },
                fields: [
                  { type: 'string', name: 'name', label: 'Name', required: true },
                  {
                    type: 'string',
                    name: 'body',
                    label: 'Body',
                    ui: { component: 'textarea' },
                  },
                  {
                    type: 'string',
                    name: 'icon',
                    label: 'Icon',
                    options: [
                      { value: 'bot', label: 'AI / bot' },
                      { value: 'layers', label: 'CMS / layers' },
                      { value: 'file-text', label: 'Documents' },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'contact',
            label: 'Contact',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'title', label: 'Title', required: true },
              {
                type: 'string',
                name: 'body',
                label: 'Body',
                ui: { component: 'textarea' },
              },
            ],
          },
        ],
      },
    ],
  },
})

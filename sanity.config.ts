'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {deskStructure} from '@/sanity/structure'
import {media} from 'sanity-plugin-media'
import {muxInput} from 'sanity-plugin-mux-input'
import {defaultDocumentNode} from '@/sanity/lib/default-document-node'
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from '@/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Your Project Name',
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: deskStructure,
      defaultDocumentNode,
    }),
    visionTool({
      defaultApiVersion: apiVersion,
      defaultDataset: dataset,
    }),
    media(),
    muxInput(),
  ],
  document: {
    unstable_comments: {
      enabled: false
    }
  },
})

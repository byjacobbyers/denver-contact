import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Create a client for fetching data in the getProps page functions
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if you want to ensure fresh data
  perspective: 'published', // Use 'previewDrafts' for draft mode
  stega: {
    enabled: false, // Set to true if you want to use Stega for visual editing
    studioUrl: '/studio',
  },
})

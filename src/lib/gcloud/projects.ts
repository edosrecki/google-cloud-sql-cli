import memoize from 'memoizee'
import { execCommandMultiline } from '../util/exec'

export const fetchGoogleCloudProjects = memoize((): string[] => {
  return execCommandMultiline(`
    gcloud projects list --format='value(projectId)'
  `)
})

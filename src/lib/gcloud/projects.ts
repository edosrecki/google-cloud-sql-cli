import memoize from 'memoizee'
import { execCommandMultilineAsync } from '../util/exec.js'

export const fetchGoogleCloudProjects = memoize(async (): Promise<string[]> => {
  return execCommandMultilineAsync(`
    gcloud projects list --format='value(projectId)'
  `)
}, { promise: true })

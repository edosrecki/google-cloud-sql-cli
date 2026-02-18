import { search } from '@inquirer/prompts'
import { fetchGoogleCloudProjects } from '../../../lib/gcloud/projects.js'
import { search as fuzzySearch } from '../../../lib/util/search.js'

export const promptGoogleCloudProject = (): Promise<string> =>
  search({
    message: 'Choose Google Cloud project:',
    source: async (term) => {
      const projects = await fetchGoogleCloudProjects()
      return fuzzySearch(projects, term)
    },
  })

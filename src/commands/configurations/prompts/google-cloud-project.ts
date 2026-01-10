import { fetchGoogleCloudProjects } from '../../../lib/gcloud/projects.js'
import { ConfigurationCreateAnswers } from '../../../lib/types.js'
import { tryCatch } from '../../../lib/util/error.js'
import { search } from '../../../lib/util/search.js'

const source = tryCatch((answers: ConfigurationCreateAnswers, input?: string) => {
  const projects = fetchGoogleCloudProjects()
  return search(projects, input)
})

export const googleCloudProjectPrompt = {
  type: 'autocomplete',
  name: 'googleCloudProject',
  message: 'Choose Google Cloud project:',
  source,
}

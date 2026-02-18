import { search } from '@inquirer/prompts'
import { fetchKubernetesContexts } from '../../../lib/kubectl/contexts.js'
import { search as fuzzySearch } from '../../../lib/util/search.js'

export const promptKubernetesContext = (): Promise<string> =>
  search({
    message: 'Choose Kubernetes context:',
    source: async (term) => {
      const contexts = await fetchKubernetesContexts()
      return fuzzySearch(contexts, term)
    },
  })

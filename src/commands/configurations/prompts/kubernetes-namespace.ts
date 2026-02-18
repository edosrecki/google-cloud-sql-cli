import { search } from '@inquirer/prompts'
import { fetchKubernetesNamespaces } from '../../../lib/kubectl/namespaces.js'
import { search as fuzzySearch } from '../../../lib/util/search.js'

export const promptKubernetesNamespace = (kubernetesContext: string): Promise<string> =>
  search({
    message: 'Choose Kubernetes namespace:',
    source: async (term) => {
      const namespaces = await fetchKubernetesNamespaces(kubernetesContext)
      return fuzzySearch(namespaces, term)
    },
  })

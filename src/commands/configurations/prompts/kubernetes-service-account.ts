import { search } from '@inquirer/prompts'
import { fetchKubernetesServiceAccounts } from '../../../lib/kubectl/service-accounts.js'
import { search as fuzzySearch } from '../../../lib/util/search.js'

export const promptKubernetesServiceAccount = (
  kubernetesContext: string,
  kubernetesNamespace: string,
): Promise<string> =>
  search({
    message: 'Choose Kubernetes service account:',
    source: async (term) => {
      const serviceAccounts = await fetchKubernetesServiceAccounts(
        kubernetesContext,
        kubernetesNamespace,
      )
      return fuzzySearch(serviceAccounts, term)
    },
  })

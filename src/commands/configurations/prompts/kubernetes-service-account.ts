import { fetchKubernetesServiceAccounts } from '../../../lib/kubectl/service-accounts.js'
import { ConfigurationCreateAnswers } from '../../../lib/types.js'
import { search } from '../../../lib/util/search.js'
import { tryCatch } from '../../../lib/util/error.js'

const source = tryCatch((answers: ConfigurationCreateAnswers, input?: string) => {
  const instances = fetchKubernetesServiceAccounts(
    answers.kubernetesContext,
    answers.kubernetesNamespace,
  )
  return search(instances, input)
})

export const kubernetesServiceAccountPrompt = {
  type: 'autocomplete',
  name: 'kubernetesServiceAccount',
  message: 'Choose Kubernetes service account:',
  source,
}

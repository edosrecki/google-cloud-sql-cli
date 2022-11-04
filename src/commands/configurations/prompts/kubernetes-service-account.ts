import { fetchKubernetesServiceAccounts } from '../../../lib/kubectl/service-accounts'
import { ConfigurationCreateAnswers } from '../../../lib/types'
import { search } from '../../../lib/util/search'
import { tryCatch } from '../../../lib/util/error'

const source = tryCatch((answers: ConfigurationCreateAnswers, input?: string) => {
  const instances = fetchKubernetesServiceAccounts(
    answers.kubernetesContext,
    answers.kubernetesNamespace
  )
  return search(instances, input)
})

export const kubernetesServiceAccountPrompt = {
  type: 'autocomplete',
  name: 'kubernetesServiceAccount',
  message: 'Choose Kubernetes service account:',
  source,
}

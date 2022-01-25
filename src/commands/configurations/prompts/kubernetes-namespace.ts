import { fetchKubernetesNamespaces } from '../../../lib/kubectl/namespaces'
import { ConfigurationCreateAnswers } from '../../../lib/types'
import { search } from '../../../lib/util/search'
import { tryCatch } from '../../../lib/util/error'

const source = tryCatch((answers: ConfigurationCreateAnswers, input?: string) => {
  const instances = fetchKubernetesNamespaces(answers.kubernetesContext)
  return search(instances, input)
})

export const kubernetesNamespacePrompt = {
  type: 'autocomplete',
  name: 'kubernetesNamespace',
  message: 'Choose Kubernetes namespace:',
  source,
}

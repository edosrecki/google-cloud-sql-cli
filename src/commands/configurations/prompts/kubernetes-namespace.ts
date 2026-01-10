import { fetchKubernetesNamespaces } from '../../../lib/kubectl/namespaces.js'
import { ConfigurationCreateAnswers } from '../../../lib/types.js'
import { search } from '../../../lib/util/search.js'
import { tryCatch } from '../../../lib/util/error.js'

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

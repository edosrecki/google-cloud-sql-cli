import { fetchKubernetesNamespaces } from '../../../lib/kubectl/namespaces'
import { ConfigurationCreateAnswers } from '../../../lib/types'
import { search } from '../../../lib/util/search'

const source = (answers: ConfigurationCreateAnswers, input?: string) => {
  const instances = fetchKubernetesNamespaces()
  return search(instances, input)
}

export const kubernetesNamespacePrompt = {
  type: 'autocomplete',
  name: 'kubernetesNamespace',
  message: 'Choose Kubernetes namespace:',
  source,
}

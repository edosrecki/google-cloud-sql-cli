import { fetchKubernetesContexts } from '../../../lib/kubectl/contexts.js'
import { ConfigurationCreateAnswers } from '../../../lib/types.js'
import { search } from '../../../lib/util/search.js'
import { tryCatch } from '../../../lib/util/error.js'

const source = tryCatch((answers: ConfigurationCreateAnswers, input?: string) => {
  const instances = fetchKubernetesContexts()
  return search(instances, input)
})

export const kubernetesContextPrompt = {
  type: 'autocomplete',
  name: 'kubernetesContext',
  message: 'Choose Kubernetes context:',
  source,
}

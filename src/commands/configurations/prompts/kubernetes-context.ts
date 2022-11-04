import { fetchKubernetesContexts } from '../../../lib/kubectl/contexts'
import { ConfigurationCreateAnswers } from '../../../lib/types'
import { search } from '../../../lib/util/search'
import { tryCatch } from '../../../lib/util/error'

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

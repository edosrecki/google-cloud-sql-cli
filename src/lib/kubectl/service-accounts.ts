import memoize from 'memoizee'
import { execCommandMultilineAsync } from '../util/exec.js'

export const fetchKubernetesServiceAccounts = memoize(
  async (context: string, namespace: string): Promise<string[]> => {
    return execCommandMultilineAsync(`
    kubectl get serviceaccounts \
      --namespace="${namespace}" \
      --context="${context}" \
      --output='jsonpath={range .items[*]}{.metadata.name}{"\\n"}{end}'
  `)
  },
  { promise: true },
)

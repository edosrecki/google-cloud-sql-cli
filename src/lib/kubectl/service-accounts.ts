import memoize from 'memoizee'
import { execCommandMultiline } from '../util/exec.js'

export const fetchKubernetesServiceAccounts = memoize(
  (context: string, namespace: string): string[] => {
    return execCommandMultiline(`
    kubectl get serviceaccounts \
      --namespace="${namespace}" \
      --context="${context}" \
      --output='jsonpath={range .items[*]}{.metadata.name}{"\\n"}{end}'
  `)
  }
)

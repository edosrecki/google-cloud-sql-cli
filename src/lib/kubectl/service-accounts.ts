import memoize from 'memoizee'
import { execCommandMultiline } from '../util/exec'

export const fetchKubernetesServiceAccounts = memoize((namespace: string): string[] => {
  return execCommandMultiline(`
    kubectl get serviceaccounts \
      --namespace ${namespace} \
      --output='jsonpath={range .items[*]}{.metadata.name}{"\\n"}{end}'
  `)
})

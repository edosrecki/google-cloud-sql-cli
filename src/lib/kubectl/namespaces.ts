import memoize from 'memoizee'
import { execCommandMultiline } from '../util/exec'

export const fetchKubernetesNamespaces = memoize((): string[] => {
  return execCommandMultiline(`
    kubectl get namespaces \
      --output='jsonpath={range .items[*]}{.metadata.name}{"\\n"}{end}'
  `)
})

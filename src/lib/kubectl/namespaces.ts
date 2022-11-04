import memoize from 'memoizee'
import { execCommandMultiline } from '../util/exec.js'

export const fetchKubernetesNamespaces = memoize((context: string): string[] => {
  return execCommandMultiline(`
    kubectl get namespaces \
      --context="${context}" \
      --output='jsonpath={range .items[*]}{.metadata.name}{"\\n"}{end}'
  `)
})

import memoize from 'memoizee'
import { execCommandMultilineAsync } from '../util/exec.js'

export const fetchKubernetesNamespaces = memoize(async (context: string): Promise<string[]> => {
  return execCommandMultilineAsync(`
    kubectl get namespaces \
      --context="${context}" \
      --output='jsonpath={range .items[*]}{.metadata.name}{"\\n"}{end}'
  `)
}, { promise: true })

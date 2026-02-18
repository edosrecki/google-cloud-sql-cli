import memoize from 'memoizee'
import { execCommandAsync, execCommandMultilineAsync } from '../util/exec.js'

export const fetchKubernetesCurrentContext = async (): Promise<string> => {
  return execCommandAsync(`kubectl config current-context`)
}

export const fetchKubernetesContexts = memoize(async (): Promise<string[]> => {
  return execCommandMultilineAsync(`
    kubectl config get-contexts --output='name'
  `)
}, { promise: true })

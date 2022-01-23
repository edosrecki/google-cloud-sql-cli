import memoize from 'memoizee'
import { execCommand, execCommandMultiline } from '../util/exec'

export const fetchKubernetesCurrentContext = (): string => {
  return execCommand(`kubectl config current-context`)
}

export const fetchKubernetesContexts = memoize((): string[] => {
  return execCommandMultiline(`
    kubectl config get-contexts --output='name'
  `)
})

import { bold, cyan } from 'chalk'
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

export const useKubernetesContext = (context: string) => {
  execCommand(`
    kubectl config use-context "${context}"
  `)
  console.log(`Using Kubernetes context '${bold(cyan(context))}'.`)
}

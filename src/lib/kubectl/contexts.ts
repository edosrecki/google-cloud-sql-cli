import { execCommand } from '../util/exec'

export function fetchCurrentContext(): string {
  return execCommand(`kubectl config current-context`)
}

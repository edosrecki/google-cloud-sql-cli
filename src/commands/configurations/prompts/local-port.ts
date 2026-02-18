import { number } from '@inquirer/prompts'

export const promptLocalPort = (): Promise<number | undefined> =>
  number({ message: 'Enter local port for port-forwarding:' })

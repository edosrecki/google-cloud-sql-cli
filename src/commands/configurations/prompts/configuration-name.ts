import { input } from '@inquirer/prompts'

export const promptConfigurationName = (): Promise<string> =>
  input({ message: 'Enter configuration name:' })

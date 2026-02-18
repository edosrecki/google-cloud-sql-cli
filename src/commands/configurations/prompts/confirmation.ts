import { confirm } from '@inquirer/prompts'

export const promptConfirmation = (): Promise<boolean> =>
  confirm({ message: 'Do you want to proceed?' })

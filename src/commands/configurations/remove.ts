import chalk from 'chalk'
import { deleteConfiguration } from '../../lib/configurations/index.js'
import { promptConfiguration } from './prompts/configuration.js'
import { promptConfirmation } from './prompts/confirmation.js'

export const removeConfiguration = async () => {
  const configuration = await promptConfiguration()
  const confirmation = await promptConfirmation()

  if (confirmation) {
    deleteConfiguration(configuration.configurationName)

    console.log(
      chalk.green(`Deleted configuration '${chalk.bold(configuration.configurationName)}'.`),
    )
  }
  else {
    console.log(chalk.red('You are excused.'))
  }
}

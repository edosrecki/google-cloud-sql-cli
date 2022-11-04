import chalk from 'chalk'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import { saveConfiguration } from '../../lib/configurations/index.js'
import { ConfigurationCreateAnswers } from '../../lib/types.js'
import { configurationNamePrompt } from './prompts/configuration-name.js'
import { confirmationPrompt } from './prompts/confirmation.js'
import { googleCloudProjectPrompt } from './prompts/google-cloud-project.js'
import { googleCloudSqlInstancePrompt } from './prompts/google-cloud-sql-instance.js'
import { kubernetesContextPrompt } from './prompts/kubernetes-context.js'
import { kubernetesNamespacePrompt } from './prompts/kubernetes-namespace.js'
import { kubernetesServiceAccountPrompt } from './prompts/kubernetes-service-account.js'
import { localPortPrompt } from './prompts/local-port.js'

export const createConfiguration = async () => {
  inquirer.registerPrompt('autocomplete', autocomplete)

  const answers = await inquirer.prompt<ConfigurationCreateAnswers>([
    googleCloudProjectPrompt,
    googleCloudSqlInstancePrompt,
    kubernetesContextPrompt,
    kubernetesNamespacePrompt,
    kubernetesServiceAccountPrompt,
    localPortPrompt,
    configurationNamePrompt,
    confirmationPrompt,
  ])

  if (answers.confirmation) {
    saveConfiguration(answers)

    console.log(chalk.green(`Saved configuration '${chalk.bold(answers.configurationName)}'.`))
  } else {
    console.log(chalk.red('You are excused.'))
  }
}

import { green, red, bold } from 'chalk'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import { saveConfiguration } from '../../lib/configurations'
import { ConfigurationCreateAnswers } from '../../lib/types'
import { configurationNamePrompt } from './prompts/configuration-name'
import { confirmationPrompt } from './prompts/confirmation'
import { googleCloudProjectPrompt } from './prompts/google-cloud-project'
import { googleCloudSqlInstancePrompt } from './prompts/google-cloud-sql-instances'
import { kubernetesNamespacePrompt } from './prompts/kubernetes-namespace'
import { kubernetesServiceAccountPrompt } from './prompts/kubernetes-service-accounts'
import { localPortPrompt } from './prompts/local-port'

export const createConfiguration = async () => {
  inquirer.registerPrompt('autocomplete', autocomplete)

  const answers = await inquirer.prompt<ConfigurationCreateAnswers>([
    googleCloudProjectPrompt,
    googleCloudSqlInstancePrompt,
    kubernetesNamespacePrompt,
    kubernetesServiceAccountPrompt,
    localPortPrompt,
    configurationNamePrompt,
    confirmationPrompt,
  ])

  if (answers.confirmation) {
    saveConfiguration(answers)

    console.log(green(`Saved configuration '${bold(answers.configurationName)}'.`))
  } else {
    console.log(red('You are excused.'))
  }
}

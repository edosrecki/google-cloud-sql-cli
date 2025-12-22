import { bold, green, red } from 'chalk'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import { saveConfiguration } from '../../lib/configurations'
import { ConfigurationCreateAnswers } from '../../lib/types'
import { alloyDbInstancePrompt } from './prompts/alloydb-instance'
import { configurationNamePrompt } from './prompts/configuration-name'
import { confirmationPrompt } from './prompts/confirmation'
import { databaseTypePrompt } from './prompts/database-type'
import { googleCloudProjectPrompt } from './prompts/google-cloud-project'
import { googleCloudSqlInstancePrompt } from './prompts/google-cloud-sql-instance'
import { kubernetesContextPrompt } from './prompts/kubernetes-context'
import { kubernetesNamespacePrompt } from './prompts/kubernetes-namespace'
import { kubernetesServiceAccountPrompt } from './prompts/kubernetes-service-account'
import { localPortPrompt } from './prompts/local-port'

export const createConfiguration = async () => {
  inquirer.registerPrompt('autocomplete', autocomplete)

  const answers = await inquirer.prompt<ConfigurationCreateAnswers>([
    googleCloudProjectPrompt,
    databaseTypePrompt,
    googleCloudSqlInstancePrompt,
    alloyDbInstancePrompt,
    kubernetesContextPrompt,
    kubernetesNamespacePrompt,
    kubernetesServiceAccountPrompt,
    localPortPrompt,
    configurationNamePrompt,
    confirmationPrompt,
  ])

  if (answers.confirmation) {
    saveConfiguration(answers)

    console.log(green(`Saved configuration '${bold(answers.configurationName)}'.`))
  }
  else {
    console.log(red('You are excused.'))
  }
}

import chalk from 'chalk'
import { saveConfiguration } from '../../lib/configurations/index.js'
import { promptGoogleAlloyDbInstance } from './prompts/google-alloydb-instance.js'
import { promptConfigurationName } from './prompts/configuration-name.js'
import { promptConfirmation } from './prompts/confirmation.js'
import { promptDatabaseType } from './prompts/database-type.js'
import { promptGoogleCloudProject } from './prompts/google-cloud-project.js'
import { promptGoogleCloudSqlInstance } from './prompts/google-cloud-sql-instance.js'
import { promptKubernetesContext } from './prompts/kubernetes-context.js'
import { promptKubernetesNamespace } from './prompts/kubernetes-namespace.js'
import { promptKubernetesServiceAccount } from './prompts/kubernetes-service-account.js'
import { promptLocalPort } from './prompts/local-port.js'

export const createConfiguration = async () => {
  const googleCloudProject = await promptGoogleCloudProject()
  const databaseType = await promptDatabaseType()

  const databaseInstance = databaseType === 'cloudsql'
    ? await promptGoogleCloudSqlInstance(googleCloudProject)
    : await promptGoogleAlloyDbInstance(googleCloudProject)

  const kubernetesContext = await promptKubernetesContext()
  const kubernetesNamespace = await promptKubernetesNamespace(kubernetesContext)
  const kubernetesServiceAccount = await promptKubernetesServiceAccount(
    kubernetesContext,
    kubernetesNamespace,
  )
  const localPort = await promptLocalPort()
  const configurationName = await promptConfigurationName()
  const confirmation = await promptConfirmation()

  if (confirmation) {
    saveConfiguration({
      configurationName,
      databaseType,
      databaseInstance,
      kubernetesContext,
      kubernetesNamespace,
      kubernetesServiceAccount,
      localPort: localPort ?? 5432,
    })

    console.log(chalk.green(`Saved configuration '${chalk.bold(configurationName)}'.`))
  }
  else {
    console.log(chalk.red('You are excused.'))
  }
}

import { GoogleCloudSqlInstance } from './gcloud/sql-instances.js'

export type Configuration = {
  configurationName: string
  googleCloudSqlInstance: Pick<GoogleCloudSqlInstance, 'connectionName' | 'port'>
  kubernetesContext: string
  kubernetesNamespace: string
  kubernetesServiceAccount: string
  localPort: number
}

export type ConfigurationCreateAnswers = Configuration & {
  googleCloudProject: string
  confirmation: boolean
}

export type ConfigurationChooseAnswers = {
  configuration: Configuration
  confirmation?: boolean
}

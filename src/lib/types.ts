import { GoogleCloudSqlInstance } from './gcloud/sql-instances'
import { AlloyDbInstance } from './gcloud/alloydb-instances'

export type DatabaseType = 'cloudsql' | 'alloydb'

export type DatabaseInstance
  = | Pick<GoogleCloudSqlInstance, 'connectionName' | 'port'>
    | Pick<AlloyDbInstance, 'connectionName' | 'port'>

export type Configuration = {
  configurationName: string
  databaseType: DatabaseType
  databaseInstance: DatabaseInstance
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

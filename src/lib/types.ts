export type DatabaseType = 'cloudsql' | 'alloydb'

export type DatabaseInstance = {
  connectionName: string
  port: number
}

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

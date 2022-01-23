export type Configuration = {
  configurationName: string
  googleCloudSqlInstance: string
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

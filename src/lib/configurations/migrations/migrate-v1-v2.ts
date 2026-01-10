import Conf from 'conf'
import { Configuration } from '../../types.js'

interface V1Configuration {
  configurationName: string
  googleCloudSqlInstance: {
    connectionName: string
    port: number
  }
  kubernetesContext: string
  kubernetesNamespace: string
  kubernetesServiceAccount: string
  localPort: number
}

export type V1Store = Conf<{
  configurations: V1Configuration[]
}>

type V2Configuration = Configuration

const migrateConfigurationV1ToV2 = (v1: V1Configuration): V2Configuration => ({
  configurationName: v1.configurationName,
  databaseType: 'cloudsql',
  databaseInstance: {
    connectionName: v1.googleCloudSqlInstance.connectionName,
    port: v1.googleCloudSqlInstance.port,
  },
  kubernetesContext: v1.kubernetesContext,
  kubernetesNamespace: v1.kubernetesNamespace,
  kubernetesServiceAccount: v1.kubernetesServiceAccount,
  localPort: v1.localPort,
})

export const migrateV1ToV2 = (store: V1Store): void => {
  const v1Configurations = store.get('configurations')
  const v2Configurations: V2Configuration[] = v1Configurations.map(migrateConfigurationV1ToV2)

  // store.set('version', '2')
  store.set('configurations', v2Configurations)
}

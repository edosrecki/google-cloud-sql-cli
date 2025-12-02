import exitHook from 'exit-hook'
import { omit, kebabCase } from 'lodash'
import {
  deletePod,
  portForward,
  runCloudSqlProxyPod,
  runAlloyDbProxyPod,
  waitForPodReady,
} from '../kubectl/pods'
import { Configuration, ConfigurationCreateAnswers } from '../types'
import { appendOrReplaceByKey, deleteByKey, findByKey } from '../util/array'
import { randomString } from '../util/string'
import { store, CURRENT_VERSION } from './store'

const storeKey = 'configurations' as const
const searchKey = 'configurationName' as const
const excludeProperties = ['googleCloudProject', 'confirmation'] as const

export const configurationPath = store.path

type LegacyConfiguration = Omit<Configuration, 'databaseType' | 'databaseInstance'> & {
  googleCloudSqlInstance: {
    connectionName: string
    port: number
  }
}

const isLegacyConfiguration = (config: Configuration | LegacyConfiguration): config is LegacyConfiguration => {
  return 'googleCloudSqlInstance' in config && !('databaseType' in config)
}

const migrateLegacyConfiguration = (legacy: LegacyConfiguration): Configuration => {
  return {
    configurationName: legacy.configurationName,
    databaseType: 'cloudsql',
    databaseInstance: {
      connectionName: legacy.googleCloudSqlInstance.connectionName,
      port: legacy.googleCloudSqlInstance.port,
    },
    kubernetesContext: legacy.kubernetesContext,
    kubernetesNamespace: legacy.kubernetesNamespace,
    kubernetesServiceAccount: legacy.kubernetesServiceAccount,
    localPort: legacy.localPort,
  }
}

const migrateConfigurationsIfNeeded = (): void => {
  const currentVersion = store.get('version')
  const configurations = store.get(storeKey) as (Configuration | LegacyConfiguration)[]

  // Check if migration is needed (no version or configurations in old format)
  const needsMigration = !currentVersion || configurations.some(isLegacyConfiguration)

  if (needsMigration) {
    const migratedConfigurations = configurations.map((config) => {
      if (isLegacyConfiguration(config)) {
        return migrateLegacyConfiguration(config)
      }
      return config
    })

    store.set(storeKey, migratedConfigurations)
    store.set('version', CURRENT_VERSION)
  }
}

export const getConfigurations = (): Configuration[] => {
  migrateConfigurationsIfNeeded()
  return store.get(storeKey)
}

export const getConfiguration = (name: string): Configuration | undefined => {
  const configurations = getConfigurations()
  return findByKey(configurations, searchKey, name)
}

export const saveConfiguration = (answers: ConfigurationCreateAnswers): void => {
  const configuration = omit(answers, excludeProperties)

  const configurations = store.get(storeKey)
  appendOrReplaceByKey(configurations, configuration, searchKey)
  store.set(storeKey, configurations)

  if (!store.get('version')) {
    store.set('version', CURRENT_VERSION)
  }
}

export const deleteConfiguration = (configuratioName: string): void => {
  const configurations = store.get(storeKey)
  deleteByKey(configurations, searchKey, configuratioName)
  store.set(storeKey, configurations)
}

export const execConfiguration = (configuration: Configuration) => {
  const pod = {
    name: `${configuration.databaseType === 'alloydb' ? 'alloydb' : 'sql'}-proxy-${kebabCase(configuration.configurationName)}-${randomString()}`,
    context: configuration.kubernetesContext,
    namespace: configuration.kubernetesNamespace,
    serviceAccount: configuration.kubernetesServiceAccount,
    instance: configuration.databaseInstance.connectionName,
    localPort: configuration.localPort,
    remotePort: configuration.databaseInstance.port,
    databaseType: configuration.databaseType,
  }

  exitHook(() => {
    deletePod(pod)
  })

  if (configuration.databaseType === 'alloydb') {
    runAlloyDbProxyPod(pod)
  }
  else {
    runCloudSqlProxyPod(pod)
  }

  waitForPodReady(pod)
  portForward(pod)
}

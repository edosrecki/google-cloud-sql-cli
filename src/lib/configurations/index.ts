import exitHook from 'exit-hook'
import { kebabCase } from 'lodash-es'
import {
  deletePod,
  portForward,
  runProxyPod,
  waitForPodReady,
} from '../kubectl/pods.js'
import { Configuration } from '../types.js'
import { appendOrReplaceByKey, deleteByKey, findByKey } from '../util/array.js'
import { randomString } from '../util/string.js'
import { store } from './store.js'
import { configurationsKey } from './constants.js'

const searchKey = 'configurationName' as const

export const configurationPath = store.path

export const getConfigurations = (): Configuration[] => {
  return store.get(configurationsKey)
}

export const getConfiguration = (name: string): Configuration | undefined => {
  const configurations = getConfigurations()
  return findByKey(configurations, searchKey, name)
}

export const saveConfiguration = (configuration: Configuration): void => {
  const configurations = store.get(configurationsKey)
  appendOrReplaceByKey(configurations, configuration, searchKey)
  store.set(configurationsKey, configurations)
}

export const deleteConfiguration = (configuratioName: string): void => {
  const configurations = store.get(configurationsKey)
  deleteByKey(configurations, searchKey, configuratioName)
  store.set(configurationsKey, configurations)
}

export const execConfiguration = (configuration: Configuration) => {
  const pod = {
    name: `${configuration.databaseType}-proxy-${kebabCase(configuration.configurationName)}-${randomString()}`,
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

  runProxyPod(pod)

  waitForPodReady(pod)
  portForward(pod)
}

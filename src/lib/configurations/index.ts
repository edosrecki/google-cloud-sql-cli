import exitHook from 'exit-hook'
import _ from 'lodash'
import {
  deletePod,
  portForward,
  runCloudSqlProxyPod,
  waitForPodReady,
} from '../kubectl/pods.js'
import { Configuration, ConfigurationCreateAnswers } from '../types.js'
import { appendOrReplaceByKey, deleteByKey, findByKey } from '../util/array.js'
import { randomString } from '../util/string.js'
import { store } from './store.js'

const storeKey = 'configurations' as const
const searchKey = 'configurationName' as const
const excludeProperties = ['googleCloudProject', 'confirmation'] as const

export const configurationPath = store.path

export const getConfigurations = (): Configuration[] => store.get(storeKey)

export const getConfiguration = (name: string): Configuration | undefined => {
  const configurations = getConfigurations()
  return findByKey(configurations, searchKey, name)
}

export const saveConfiguration = (answers: ConfigurationCreateAnswers): void => {
  const configuration = _.omit(answers, excludeProperties)

  const configurations = store.get(storeKey)
  appendOrReplaceByKey(configurations, configuration, searchKey)
  store.set(storeKey, configurations)
}

export const deleteConfiguration = (configuratioName: string): void => {
  const configurations = store.get(storeKey)
  deleteByKey(configurations, searchKey, configuratioName)
  store.set(storeKey, configurations)
}

export const execConfiguration = (configuration: Configuration) => {
  const pod = {
    name: `sql-proxy-${configuration.configurationName}-${randomString()}`,
    context: configuration.kubernetesContext,
    namespace: configuration.kubernetesNamespace,
    serviceAccount: configuration.kubernetesServiceAccount,
    instance: configuration.googleCloudSqlInstance.connectionName,
    localPort: configuration.localPort,
    remotePort: configuration.googleCloudSqlInstance.port,
  }

  exitHook(() => {
    deletePod(pod)
  })

  runCloudSqlProxyPod(pod)
  waitForPodReady(pod)
  portForward(pod)
}

import Conf from 'conf'
import { Configuration } from '../types'

export const CURRENT_VERSION = 2

type Schema = {
  version?: number
  configurations: Configuration[]
}

export const store = new Conf<Schema>({
  configName: 'configurations',
  projectSuffix: '',
  schema: {
    version: {
      type: 'number',
    },
    configurations: {
      type: 'array',
      default: [],
      items: {
        type: 'object',
        properties: {
          configurationName: { type: 'string' },
          databaseType: { type: 'string' },
          databaseInstance: {
            type: 'object',
            properties: {
              connectionName: { type: 'string' },
              port: { type: 'number' },
            },
          },
          kubernetesContext: { type: 'string' },
          kubernetesNamespace: { type: 'string' },
          kubernetesServiceAccount: { type: 'string' },
          localPort: { type: 'number' },
        },
      },
    },
  },
})

export type Store = typeof store

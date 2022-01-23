import Conf from 'conf'
import { Configuration } from '../types'

type Schema = {
  configurations: Configuration[]
}

export const store = new Conf<Schema>({
  configName: 'configurations',
  projectSuffix: '',
  schema: {
    configurations: {
      type: 'array',
      default: [],
      items: {
        type: 'object',
        properties: {
          configurationName: { type: 'string' },
          googleCloudSqlInstance: {
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

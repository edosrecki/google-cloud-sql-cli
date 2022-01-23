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
        required: [
          'configurationName',
          'googleCloudSqlInstance',
          'kubernetesNamespace',
          'kubernetesServiceAccount',
          'localPort',
        ],
        properties: {
          configurationName: { type: 'string' },
          googleCloudSqlInstance: {
            type: 'object',
            required: ['connectionName', 'port'],
            properties: {
              connectionName: { type: 'string' },
              port: { type: 'number' },
            },
          },
          kubernetesNamespace: { type: 'string' },
          kubernetesServiceAccount: { type: 'string' },
          localPort: { type: 'number' },
        },
      },
    },
  },
})

export type Store = typeof store

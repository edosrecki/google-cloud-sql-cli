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
        ],
        properties: {
          configurationName: { type: 'string' },
          googleCloudSqlInstance: { type: 'string' },
          kubernetesNamespace: { type: 'string' },
          kubernetesServiceAccount: { type: 'string' },
        },
      },
    },
  },
})

export type Store = typeof store

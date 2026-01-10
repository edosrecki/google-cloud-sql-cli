import Conf from 'conf'
import { Configuration } from '../types'
import { migrateV1ToV2, V1Store } from './migrations/migrate-v1-v2'
import { currentVersion } from './constants'

type Schema = {
  version: number
  configurations: Configuration[]
}

export const store = new Conf<Schema>({
  configName: 'configurations',
  projectSuffix: '',
  projectVersion: currentVersion,
  migrations: {
    '2.0.0': store => migrateV1ToV2(store as unknown as V1Store),
  },
  schema: {
    version: {
      type: 'string',
      default: currentVersion,
    },
    configurations: {
      type: 'array',
      default: [],
      items: {
        type: 'object',
        properties: {
          configurationName: { type: 'string' },
          databaseType: { type: 'string', enum: ['cloudsql', 'alloydb'] },
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

import { search } from '@inquirer/prompts'
import { pick } from 'lodash-es'
import {
  fetchGoogleCloudSqlInstances,
  GoogleCloudSqlInstance,
} from '../../../lib/gcloud/sql-instances.js'
import { DatabaseInstance } from '../../../lib/types.js'
import { searchByKey } from '../../../lib/util/search.js'

const formatInstance = (instance: GoogleCloudSqlInstance) => ({
  name: `${instance.name} (${instance.region})`,
  short: instance.name,
  value: pick(instance, 'connectionName', 'port') as DatabaseInstance,
})

export const promptGoogleCloudSqlInstance = (googleCloudProject: string): Promise<DatabaseInstance> =>
  search({
    message: 'Choose Google Cloud SQL instance:',
    source: async (term) => {
      const instances = await fetchGoogleCloudSqlInstances(googleCloudProject)
      const filtered = searchByKey(instances, 'connectionName', term)
      return filtered.map(formatInstance)
    },
  })

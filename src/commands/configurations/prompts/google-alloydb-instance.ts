import { search } from '@inquirer/prompts'
import { pick } from 'lodash-es'
import {
  fetchGoogleAlloyDbInstances,
  GoogleAlloyDbInstance,
} from '../../../lib/gcloud/alloydb-instances.js'
import { DatabaseInstance } from '../../../lib/types.js'
import { searchByKey } from '../../../lib/util/search.js'

const formatInstance = (instance: GoogleAlloyDbInstance) => ({
  name: `${instance.name} (cluster: ${instance.cluster}, region: ${instance.region})`,
  short: instance.name,
  value: pick(instance, 'connectionName', 'port') as DatabaseInstance,
})

export const promptGoogleAlloyDbInstance = (googleCloudProject: string): Promise<DatabaseInstance> =>
  search({
    message: 'Choose Google AlloyDB instance:',
    source: async (term) => {
      const instances = await fetchGoogleAlloyDbInstances(googleCloudProject)
      const filtered = searchByKey(instances, 'connectionName', term)
      return filtered.map(formatInstance)
    },
  })

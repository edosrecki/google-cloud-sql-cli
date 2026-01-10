import { pick } from 'lodash-es'
import {
  fetchGoogleAlloyDbInstances,
  GoogleAlloyDbInstance,
} from '../../../lib/gcloud/alloydb-instances.js'
import { ConfigurationCreateAnswers } from '../../../lib/types.js'
import { searchByKey } from '../../../lib/util/search.js'
import { tryCatch } from '../../../lib/util/error.js'

const formatInstance = (instance: GoogleAlloyDbInstance) => {
  const { name, region, cluster } = instance
  return {
    name: `${name} (cluster: ${cluster}, region: ${region})`,
    short: name,
    value: pick(instance, 'connectionName', 'port'),
  }
}

const source = tryCatch((answers: ConfigurationCreateAnswers, input?: string) => {
  const instances = fetchGoogleAlloyDbInstances(answers.googleCloudProject)
  const filtered = searchByKey(instances, 'connectionName', input)

  return filtered.map(formatInstance)
})

export const googleAlloyDbInstancePrompt = {
  type: 'autocomplete',
  name: 'databaseInstance',
  message: 'Choose Google AlloyDB instance:',
  source,
  when: (answers: ConfigurationCreateAnswers) => answers.databaseType === 'alloydb',
}

import { pick } from 'lodash'
import {
  fetchAlloyDbInstances,
  AlloyDbInstance,
} from '../../../lib/gcloud/alloydb-instances'
import { ConfigurationCreateAnswers } from '../../../lib/types'
import { searchByKey } from '../../../lib/util/search'
import { tryCatch } from '../../../lib/util/error'

const formatInstance = (instance: AlloyDbInstance) => {
  const { name, region, cluster } = instance
  return {
    name: `${name} (cluster: ${cluster}, region: ${region})`,
    short: name,
    value: pick(instance, 'connectionName', 'port'),
  }
}

const source = tryCatch((answers: ConfigurationCreateAnswers, input?: string) => {
  const instances = fetchAlloyDbInstances(answers.googleCloudProject)
  const filtered = searchByKey(instances, 'connectionName', input)

  return filtered.map(formatInstance)
})

export const alloyDbInstancePrompt = {
  type: 'autocomplete',
  name: 'databaseInstance',
  message: 'Choose AlloyDB instance:',
  source,
  when: (answers: ConfigurationCreateAnswers) => answers.databaseType === 'alloydb',
}

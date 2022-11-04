import _ from 'lodash'
import {
  fetchGoogleCloudSqlInstances,
  GoogleCloudSqlInstance,
} from '../../../lib/gcloud/sql-instances.js'
import { ConfigurationCreateAnswers } from '../../../lib/types.js'
import { searchByKey } from '../../../lib/util/search.js'
import { tryCatch } from '../../../lib/util/error.js'

const formatInstance = (instance: GoogleCloudSqlInstance) => {
  const { name, region } = instance
  return {
    name: `${name} (${region})`,
    short: name,
    value: _.pick(instance, 'connectionName', 'port'),
  }
}

const source = tryCatch((answers: ConfigurationCreateAnswers, input?: string) => {
  const instances = fetchGoogleCloudSqlInstances(answers.googleCloudProject)
  const filtered = searchByKey(instances, 'connectionName', input)

  return filtered.map(formatInstance)
})

export const googleCloudSqlInstancePrompt = {
  type: 'autocomplete',
  name: 'googleCloudSqlInstance',
  message: 'Choose Google Cloud SQL instance:',
  source,
}

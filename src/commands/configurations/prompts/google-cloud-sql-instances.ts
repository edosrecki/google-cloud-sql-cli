import { pick } from 'lodash'
import {
  fetchGoogleCloudSqlInstances,
  GoogleCloudSqlInstance,
} from '../../../lib/gcloud/sql-instances'
import { ConfigurationCreateAnswers } from '../../../lib/types'
import { searchByKey } from '../../../lib/util/search'

const formatInstance = (instance: GoogleCloudSqlInstance) => {
  const { name, region } = instance
  return {
    name: `${name} (${region})`,
    short: name,
    value: pick(instance, 'connectionName', 'port'),
  }
}

const source = (answers: ConfigurationCreateAnswers, input?: string) => {
  const instances = fetchGoogleCloudSqlInstances(answers.googleCloudProject)
  const filtered = searchByKey(instances, 'connectionName', input)

  return filtered.map(formatInstance)
}

export const googleCloudSqlInstancePrompt = {
  type: 'autocomplete',
  name: 'googleCloudSqlInstance',
  message: 'Choose Google Cloud SQL instance:',
  source,
}

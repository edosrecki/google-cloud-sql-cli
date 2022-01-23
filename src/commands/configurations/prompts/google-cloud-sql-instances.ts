import { fetchGoogleCloudSqlInstances } from '../../../lib/gcloud/sql-instances'
import { ConfigurationCreateAnswers } from '../../../lib/types'
import { search } from '../../../lib/util/search'

const formatInstance = (connectionName: string) => {
  const [, region, name] = connectionName.split(':')
  return {
    name: `${name} (${region})`,
    short: name,
    value: connectionName,
  }
}

const source = (answers: ConfigurationCreateAnswers, input?: string) => {
  const instances = fetchGoogleCloudSqlInstances(answers.googleCloudProject)
  const filtered = search(instances, input)

  return filtered.map(formatInstance)
}

export const googleCloudSqlInstancePrompt = {
  type: 'autocomplete',
  name: 'googleCloudSqlInstance',
  message: 'Choose Google Cloud SQL instance:',
  source,
}

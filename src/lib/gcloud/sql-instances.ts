import memoize from 'memoizee'
import { execCommandMultiline } from '../util/exec'

export type GoogleCloudSqlInstance = {
  name: string
  region: string
  connectionName: string
  port: number
}

const versionNameToPort = (version: string): number => {
  const lowercased = version.toLowerCase()
  if (lowercased.includes('mysql')) return 3306
  if (lowercased.includes('postgres')) return 5432
  return 1433
}

const parseInstance = (instance: string): GoogleCloudSqlInstance => {
  const [connectionName, version] = instance.split(',')
  const [, region, name] = connectionName.split(':')
  const port = versionNameToPort(version)

  return { name, region, connectionName, port }
}

export const fetchGoogleCloudSqlInstances = memoize(
  (project: string): GoogleCloudSqlInstance[] => {
    const instances = execCommandMultiline(`
      gcloud sql instances list \
        --project=${project} \
        --format='csv(connectionName,databaseVersion)' \
        --quiet \
      | tail -n-1
    `)

    return instances.map(parseInstance)
  }
)

import memoize from 'memoizee'
import { execCommandMultilineAsync } from '../util/exec.js'

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
  async (project: string): Promise<GoogleCloudSqlInstance[]> => {
    const instances = await execCommandMultilineAsync(`
      gcloud sql instances list \
        --project=${project} \
        --format='csv(connectionName,databaseVersion)' \
        --quiet
    `)

    // skip header line
    return instances.slice(1).map(parseInstance)
  },
  { promise: true },
)

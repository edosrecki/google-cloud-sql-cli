import memoize from 'memoizee'
import { execCommandMultiline } from '../util/exec'
import { parseJson } from '../util/parsers'

export type AlloyDbInstance = {
  name: string
  region: string
  cluster: string
  connectionName: string
  port: number
}

type AlloyDbInstanceData = {
  name: string
  databaseVersion?: string
}

const parseInstance = (instanceData: AlloyDbInstanceData): AlloyDbInstance => {
  // AlloyDB instance name format: projects/{project}/locations/{region}/clusters/{cluster}/instances/{instance}
  const nameParts = instanceData.name.split('/')
  const region = nameParts[3]
  const cluster = nameParts[5]
  const instance = nameParts[7]

  // Connection name format: Full resource path (same as name)
  const connectionName = instanceData.name
  const port = 5432

  return {
    name: instance,
    region,
    cluster,
    connectionName,
    port,
  }
}

export const fetchAlloyDbInstances = memoize(
  (project: string): AlloyDbInstance[] => {
    try {
      const output = execCommandMultiline(`
        gcloud alloydb instances list \
          --project=${project} \
          --format=json \
          --quiet
      `)

      if (output.length === 0 || output[0].trim() === '') {
        return []
      }

      const instances = parseJson(output.join('\n'))

      if (!Array.isArray(instances)) {
        return []
      }

      return instances.map(parseInstance)
    }
    catch {
      // If AlloyDB API is not enabled or there are no instances, return empty array
      return []
    }
  },
)

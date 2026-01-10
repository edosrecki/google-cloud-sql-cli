import memoize from 'memoizee'
import { execCommandMultiline } from '../util/exec'

export type GoogleAlloyDbInstance = {
  name: string
  region: string
  cluster: string
  connectionName: string
  port: number
}

const parseInstance = (connectionName: string): GoogleAlloyDbInstance => {
  // projects/{project}/locations/{region}/clusters/{cluster}/instances/{instance}
  const nameParts = connectionName.split('/')
  const region = nameParts[3]
  const cluster = nameParts[5]
  const instance = nameParts[7]

  return {
    name: instance,
    region,
    cluster,
    connectionName,
    port: 5432,
  }
}

export const fetchGoogleAlloyDbInstances = memoize(
  (project: string): GoogleAlloyDbInstance[] => {
    try {
      const instances = execCommandMultiline(`
        gcloud alloydb instances list \
          --project=${project} \
          --format='csv(name)' \
          --quiet
      `)

      return instances.slice(1).map(parseInstance)
    }
    catch {
      return []
    }
  },
)

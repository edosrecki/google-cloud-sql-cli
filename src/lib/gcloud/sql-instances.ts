import memoize from 'memoizee'
import { execCommandMultiline } from '../util/exec'

export const fetchGoogleCloudSqlInstances = memoize((project: string): string[] => {
  return execCommandMultiline(`
    gcloud sql instances list \
      --project=${project} \
      --format='value(connectionName)' \
      --quiet
  `)
})

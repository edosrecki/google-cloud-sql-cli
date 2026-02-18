import { select } from '@inquirer/prompts'
import { DatabaseType } from '../../../lib/types.js'

export const promptDatabaseType = (): Promise<DatabaseType> =>
  select({
    message: 'Choose database type:',
    choices: [
      { name: 'Cloud SQL', value: 'cloudsql' as const },
      { name: 'AlloyDB', value: 'alloydb' as const },
    ],
  })

import { search } from '@inquirer/prompts'
import { getConfigurations } from '../../../lib/configurations/index.js'
import { Configuration } from '../../../lib/types.js'
import { searchByKey } from '../../../lib/util/search.js'

const formatConfiguration = (configuration: Configuration) => ({
  name: configuration.configurationName,
  short: configuration.configurationName,
  value: configuration,
})

export const promptConfiguration = (): Promise<Configuration> =>
  search({
    message: 'Choose configuration:',
    source: async (term) => {
      const configurations = getConfigurations()
      const filtered = searchByKey(configurations, 'configurationName', term)
      return filtered.map(formatConfiguration)
    },
  })

import { getConfigurations } from '../../../lib/configurations'
import { Configuration, ConfigurationChooseAnswers } from '../../../lib/types'
import { searchByKey } from '../../../lib/util/search'
import { tryCatch } from '../../../lib/util/error'

const formatConfiguration = (configuration: Configuration) => {
  return {
    name: configuration.configurationName,
    short: configuration.configurationName,
    value: configuration,
  }
}

const source = tryCatch((answers: ConfigurationChooseAnswers, input?: string) => {
  const configurations = getConfigurations()
  const filtered = searchByKey(configurations, 'configurationName', input)

  return filtered.map(formatConfiguration)
})

export const configurationPrompt = {
  type: 'autocomplete',
  name: 'configuration',
  message: 'Choose configuration:',
  source,
}

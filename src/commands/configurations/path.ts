import { bold } from 'chalk'
import { configurationPath } from '../../lib/configurations'

export const showConfigurationPath = () => {
  console.log(bold(configurationPath))
}

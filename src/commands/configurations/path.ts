import chalk from 'chalk'
import { configurationPath } from '../../lib/configurations/index.js'

export const showConfigurationPath = () => {
  console.log(chalk.bold(configurationPath))
}

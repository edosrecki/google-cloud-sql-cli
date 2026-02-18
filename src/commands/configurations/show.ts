import { promptConfiguration } from './prompts/configuration.js'

export const showConfiguration = async () => {
  const configuration = await promptConfiguration()

  console.dir(configuration)
}

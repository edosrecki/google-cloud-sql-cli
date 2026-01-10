import boxen from 'boxen'
import updateNotifier from 'update-notifier'
import chalk from 'chalk'
import { version } from './version.js'

const name = 'google-cloud-sql'
const oneDayMs = 24 * 60 * 60 * 1000

export const notifyForUpdates = () => {
  const { update } = updateNotifier({
    pkg: {
      name,
      version,
    },
    updateCheckInterval: oneDayMs,
  })

  if (update && update.current !== update.latest) {
    const text
      = `${chalk.yellow(update.current)} ↦ ${chalk.green(update.latest)}\n\n`
        + `${chalk.blue('brew')} upgrade ${name}\n`
        + `${chalk.blue('npm')} i -g ${name}`

    const box = boxen(text, {
      title: 'Update Available',
      titleAlignment: 'center',
      borderColor: 'yellow',
      padding: 1,
      margin: 1,
    })

    console.log(box)
  }
}

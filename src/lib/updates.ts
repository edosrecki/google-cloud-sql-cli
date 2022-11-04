import boxen from 'boxen'
import updateNotifier from 'update-notifier'
import { yellow, green, blue } from 'chalk'
import { version } from './version'

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

  if (update) {
    const text =
      `${yellow(update.current)} ↦ ${green(update.latest)}\n\n` +
      `${blue('brew')} upgrade ${name}\n` +
      `${blue('npm')} i -g ${name}`

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

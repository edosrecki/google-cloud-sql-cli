import { bold, red } from 'chalk'

export class CommandExecutionError extends Error {
  data: string

  constructor(command: string, stderr: string, stdout?: string) {
    super('Error while executing command.')

    this.data =
      `${bold(red(this.message))}\n` +
      `  ${bold('command')}: ${command.trim()}\n` +
      `  ${bold('stderr')}: ${stderr.trim()}\n` +
      (stdout ? `  ${bold('stdout')}: ${stdout.trim()}\n` : '')
  }
}

export const tryCatch = <A, B, R>(fn: (a: A, b: B) => R) => {
  return (a: A, b: B) => {
    try {
      return fn(a, b)
    } catch (error) {
      if (error instanceof CommandExecutionError) {
        console.error(error.data)
      } else {
        console.error(error)
      }

      throw error
    }
  }
}

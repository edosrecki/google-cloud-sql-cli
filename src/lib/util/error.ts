import chalk from 'chalk'

export class CommandExecutionError extends Error {
  data: string

  constructor(command: string, stderr: string, stdout?: string) {
    super('Error while executing command.')

    this.data =
      `${chalk.bold.red(this.message)}\n` +
      `  ${chalk.bold('command')}: ${command.trim()}\n` +
      `  ${chalk.bold('stderr')}: ${stderr.trim()}\n` +
      (stdout ? `  ${chalk.bold('stdout')}: ${stdout.trim()}\n` : '')
  }
}

export const tryCatch = <A, B, R>(fn: (a: A, b: B) => R) => {
  return (a: A, b: B) => {
    try {
      return fn(a, b)
    } catch (error) {
      logError(error)

      throw error
    }
  }
}

export const logError = (error: unknown) => {
  if (error instanceof CommandExecutionError) {
    console.error(error.data)
  } else {
    console.error(error)
  }
}

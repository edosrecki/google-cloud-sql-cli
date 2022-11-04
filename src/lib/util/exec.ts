import { EOL } from 'node:os'
import shell from 'shelljs'
import { CommandExecutionError } from './error.js'

export const execCommand = (command: string): string => {
  const { stdout, stderr, code } = shell.exec(command, { silent: true })

  if (code !== 0) {
    throw new CommandExecutionError(command, stderr, stdout)
  }

  return stdout.trim()
}

export const execCommandMultiline = (command: string): string[] => {
  return execCommand(command).split(EOL)
}

export const execCommandAttached = (command: string) => {
  shell.exec(command)
}

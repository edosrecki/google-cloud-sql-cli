import { EOL } from 'os'
import shell from 'shelljs'
import { CommandExecutionError } from './error'

export const execCommand = (command: string): string => {
  const { stdout, stderr } = shell.exec(command, { silent: true })

  if (stderr) {
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

import { EOL } from 'os'
import shell from 'shelljs'

export const execCommand = (command: string): string => {
  const { stdout } = shell.exec(command, { silent: true })
  return stdout.trim()
}

export const execCommandMultiline = (command: string): string[] => {
  return execCommand(command).split(EOL)
}

export const execCommandAttached = (command: string) => {
  shell.exec(command)
}

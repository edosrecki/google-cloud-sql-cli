import { exec } from 'child_process'
import { EOL } from 'os'
import { promisify } from 'util'
import shell from 'shelljs'
import { CommandExecutionError } from './error.js'

const execPromise = promisify(exec)

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

export const execCommandAsync = async (command: string): Promise<string> => {
  try {
    const { stdout } = await execPromise(command)
    return stdout.trim()
  }
  catch (error: unknown) {
    const err = error as { stderr?: string, stdout?: string }
    throw new CommandExecutionError(command, err.stderr || '', err.stdout)
  }
}

export const execCommandMultilineAsync = async (command: string): Promise<string[]> => {
  const result = await execCommandAsync(command)
  return result.split(EOL)
}

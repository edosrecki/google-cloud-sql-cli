import { exec, execSync } from 'child_process'
import { EOL } from 'os'
import { promisify } from 'util'
import { CommandExecutionError } from './error.js'

const execPromise = promisify(exec)

export const execCommand = (command: string): string => {
  try {
    return execSync(command, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim()
  }
  catch (error: unknown) {
    const err = error as { stderr?: Buffer | string, stdout?: Buffer | string }
    throw new CommandExecutionError(
      command,
      err.stderr?.toString() || '',
      err.stdout?.toString(),
    )
  }
}

export const execCommandMultiline = (command: string): string[] => {
  return execCommand(command).split(EOL)
}

export const execCommandAttached = (command: string): void => {
  execSync(command, { stdio: 'inherit' })
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

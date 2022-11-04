import crypto from 'node:crypto'

export const randomString = (size = 4): string => {
  return crypto.randomBytes(size).toString('hex').slice(0, size)
}

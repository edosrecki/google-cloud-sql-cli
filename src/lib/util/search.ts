import Fuse from 'fuse.js'

// Interval [0, 1], where 0 = 100% match
const THRESHOLD = 0.2
const MIN_CHARS = 3

export const fuzzy = <T>(fuse: Fuse<T>, data: T[], input?: string): T[] => {
  if (!input || input.length < MIN_CHARS) {
    return data
  }
  return fuse.search(input).map(({ item }) => item)
}

export const search = (data: string[], input?: string): string[] => {
  const fuse = new Fuse(data, { threshold: THRESHOLD })
  return fuzzy(fuse, data, input)
}

export const searchByKey = <T>(data: T[], key: string, input?: string): T[] => {
  const fuse = new Fuse(data, { threshold: THRESHOLD, keys: [key] })
  return fuzzy(fuse, data, input)
}

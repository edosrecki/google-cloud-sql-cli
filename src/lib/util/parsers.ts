export type Parser<T = unknown> = (value: string) => T

export const toInt = (value: string): number => parseInt(value, 10)

const trueValues = new Set(['true', 'yes', 'on', '1'])
export const toBoolean = (value: string): boolean => trueValues.has(value)

export const parseJson = <T = unknown>(value: string): T => JSON.parse(value)

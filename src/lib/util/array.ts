const findIndexByKey = <T, K extends keyof T>(items: T[], key: K, value: T[K]): number =>
  items.findIndex((item) => item[key] === value)

export const findByKey = <T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
): T | undefined => items.find((item) => item[key] === value)

export const appendOrReplaceByKey = <T>(items: T[], item: T, key: keyof T) => {
  const index = findIndexByKey(items, key, item[key])
  if (index >= 0) {
    items[index] = item
  } else {
    items.push(item)
  }
}

export const deleteByKey = <T, K extends keyof T>(
  items: T[],
  key: keyof T,
  value: T[K]
) => {
  const index = findIndexByKey(items, key, value)
  if (index >= 0) items.splice(index, 1)
}

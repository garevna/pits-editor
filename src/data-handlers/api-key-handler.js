let key = ''

export const apiKeyHandler = arg => {
  if (!arg) return key
  key = arg
}

let host = ''

export const hostHandler = arg => {
  if (!arg) return host
  host = arg
}

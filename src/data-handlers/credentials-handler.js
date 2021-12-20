let creds = ''

export const credentialsHandler = arg => {
  if (!arg) return creds
  creds = arg
}

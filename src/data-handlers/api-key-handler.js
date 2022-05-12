let key = process.env.VUE_APP_GOOGLE_MAPS_API_KEY

export const apiKeyHandler = arg => {
  if (!arg) return key
  key = arg
}

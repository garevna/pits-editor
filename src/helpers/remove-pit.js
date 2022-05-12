import { hostHandler, apiKeyHandler, credentialsHandler } from '../data-handlers'
// import { showErrorMessage } from './show-error-message'

export const removePit = async (id, resolve, reject) => {
  const { data, error } = await (await fetch(`${hostHandler()}/pits/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    }
  })).json()

  if (!error) {
    if (resolve && typeof resolve === 'function') resolve(data)
    else return { data, error }
  } else {
    if (reject && typeof reject === 'function') reject(error)
    else return { data, error }
  }
}

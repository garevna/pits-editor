import { hostHandler, apiKeyHandler, credentialsHandler } from '../data-handlers'
// import { showErrorMessage } from './show-error-message'

export const postPit = async (data, resolve, reject) => {
  const { coordinates, address, description, wellType } = data

  const { data: response, error } = await (await fetch(`${hostHandler()}/pits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    },
    body: JSON.stringify({ coordinates, address, description, wellType })
  })).json()

  if (!error) {
    if (resolve && typeof resolve === 'function') resolve(response)
    else return { data: response, error }
  } else {
    if (reject && typeof reject === 'function') reject(error)
    else return { data: response, error }
  }

  // if (response.status !== 200) return showErrorMessage('Failed to add new pit: remote server error')
  //
  // return (await response.json()).data
}

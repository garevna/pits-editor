import { hostHandler, apiKeyHandler, credentialsHandler } from '../data-handlers'
// import { showErrorMessage } from './show-error-message'

export const patchPit = async (id, data, resolve, reject) => {
  const { data: response, error } = await (await fetch(`${hostHandler()}/pits/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    },
    body: JSON.stringify(data)
  })).json()

  if (!error) {
    if (resolve && typeof resolve === 'function') resolve(response)
    else return { data: response, error }
  } else {
    if (reject && typeof reject === 'function') reject(error)
    else return { data: response, error }
  }

  // if (response.status !== 200) {
  //   showErrorMessage('Failed to update pit: remote server error')
  //   return { status: 500, result: id }
  // }
  // return { status: 200, result: id }
}

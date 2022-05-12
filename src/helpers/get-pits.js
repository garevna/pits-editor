import { hostHandler, apiKeyHandler, credentialsHandler } from '../data-handlers'
// import { showErrorMessage } from './show-error-message'

export const getPits = async (resolve, reject) => {
  const { data, error } = await (await fetch(`${hostHandler()}/pits`, {
    method: 'GET',
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

  // if (!data && error) return showErrorMessage('Error fetching pits from remote server')
  //
  // return data
}

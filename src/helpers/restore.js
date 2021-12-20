import { endpoints } from '../config/polygon-types'
import { showErrorMessage } from './show-error-message'
import { apiKeyHandler, credentialsHandler } from '../data-handlers'

export const restore = async () => {
  for (const endpoint of endpoints) {
    let response = await fetch(`https://portal.dgtek.net/polygons/${endpoint}`)

    if (response.status !== 200) return showErrorMessage(`Error reading ${endpoint} polygons data from PORTAL remote server!!!`)

    const { data } = await response.json()

    response = await fetch(`https://portal.staging.dgtek.net/polygons/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKeyHandler(),
        Credentials: credentialsHandler()
      },
      body: JSON.stringify(data)
    })
  }
  location.reload()
}

import {
  hostHandler,
  apiKeyHandler,
  credentialsHandler,
  deletedPolygonsHandler
} from '../data-handlers'

import { showErrorMessage } from './show-error-message'

export const deletePolygons = async () => {
  const removed = deletedPolygonsHandler()

  const promises = []

  for (const id in removed) {
    const promise = await fetch(`${hostHandler()}/polygons/${removed[id]}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKeyHandler(),
        Credentials: credentialsHandler()
      }
    }).catch(error => showErrorMessage(error))

    promises.push(promise)
  }

  deletedPolygonsHandler('reset')

  return await Promise.all(promises)
}

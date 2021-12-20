import { endpoints, availablePolygonTypes } from '../config/polygon-types'
import { hostHandler, apiKeyHandler, credentialsHandler } from '../data-handlers'
import { showErrorMessage } from './show-error-message'

export const patchPolygon = async (polygonId) => {
  const polygon = localStorage.getItemByName(polygonId)
  if (!polygon) return showErrorMessage(`Invalid polygon id: ${polygonId}`)

  const { typeOf } = polygon.properties
  const { properties, geometry } = polygon

  const endpoint = endpoints[availablePolygonTypes.findIndex(type => type === typeOf)]

  const response = await fetch(`${hostHandler()}/polygons/${endpoint}/${polygonId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    },
    body: JSON.stringify({ typeOf, properties, geometry })
  })

  if (response.status !== 200) {
    showErrorMessage(`Failed to update ${typeOf}: ${polygonId} : remote server error`)
    return { status: 500, id: polygonId }
  }
  return { status: 200, id: polygonId }
}

import { endpoints, availablePolygonTypes } from '../config/polygon-types'
import { hostHandler, apiKeyHandler, credentialsHandler } from '../data-handlers'
import { showErrorMessage } from './show-error-message'

export const postPolygon = async (polygonId) => {
  if (polygonId.indexOf('new-polygon') === -1) return showErrorMessage(`Polygon ${polygonId} already exists`)

  const polygon = localStorage.getItemByName(polygonId)
  if (!polygon) return showErrorMessage(`Post operation failed. Polygon ${polygonId} not found`)

  const { properties, geometry } = polygon
  const { typeOf } = properties

  const endpoint = endpoints[availablePolygonTypes.findIndex(type => type === typeOf)]

  let response = await fetch(`${hostHandler()}/polygons/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    },
    body: JSON.stringify({ typeOf, type: 'Feature', properties, geometry })
  })

  if (response.status !== 200) return showErrorMessage(`Failed to update ${typeOf}: ${polygonId} : remote server error`)

  const newPolygonId = (await response.json()).data

  response = await fetch(`${hostHandler()}/polygons/${endpoint}/${newPolygonId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    },
    body: JSON.stringify({ properties: Object.assign(polygon.properties, { id: newPolygonId }) })
  })

  // return await response.json()

  return newPolygonId
}

import { endpoints, availablePolygonTypes } from '../config/polygon-types'
import { hostHandler } from '../data-handlers'
import { showErrorMessage } from './show-error-message'

export const getPolygonsByType = async (endpoint) => {
  const index = endpoints.findIndex(item => item === endpoint)
  if (index === -1) return showErrorMessage(`Invalid polygon type: ${endpoint}`)

  const response = await fetch(`${hostHandler()}/polygons/${endpoint}`)

  if (response.status !== 200) return showErrorMessage(`Error reading ${endpoint} polygons data from remote server`)

  const collection = []

  const { data } = await response.json()

  data.forEach((polygon, index) => {
    localStorage.setItemByName(polygon._id, Object.assign(polygon, {
      properties: Object.assign(polygon.properties, { id: polygon._id })
    }))
    collection.push(polygon._id)
  })
  localStorage.setItemByName(availablePolygonTypes[index], collection)
}

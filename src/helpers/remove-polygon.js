import { endpoints, availablePolygonTypes } from '../config'
import { deletedPolygonsHandler } from '../data-handlers'
import { showErrorMessage } from './show-error-message'

export const removePolygon = (polygonId) => {
  const polygon = localStorage.getItemByName(polygonId)
  if (!polygon) return showErrorMessage(`Delete operation failed. Polygon ${polygonId} not found`)

  const typeOf = polygon.properties.typeOf

  const collection = localStorage.getItemByName(typeOf)
  const index = availablePolygonTypes.findIndex(item => item === typeOf)

  collection.splice(index, 1)
  localStorage.setItemByName(typeOf, collection)

  deletedPolygonsHandler({ [polygonId]: endpoints[index] })

  localStorage.removeItem(polygonId)

  return typeOf
}

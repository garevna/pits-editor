import { availablePolygonTypes } from '../config/polygon-types'

import { showErrorMessage } from './show-error-message'

export const updatePolygonType = async (polygonId, newPolygonType) => {
  if (!availablePolygonTypes.includes(newPolygonType)) return showErrorMessage(`Invalid polygon type: ${newPolygonType}`)
  const polygon = localStorage.getItemByName(polygonId)
  if (!polygon) return showErrorMessage(`Invalid polygon id: ${polygonId}`)

  const oldPolygonType = polygon.properties.typeOf

  Object.assign(polygon, {
    modified: Date.now(),
    properties: Object.assign(polygon.properties, { typeOf: newPolygonType })
  })

  let collection = localStorage.getItemByName(oldPolygonType)
  const index = collection.findIndex(id => id === polygonId)
  collection.splice(index, 1)
  localStorage.setItemByName(oldPolygonType, collection)

  collection = localStorage.getItemByName(newPolygonType)
  collection.push(polygonId)
  localStorage.setItemByName(newPolygonType, collection)
}

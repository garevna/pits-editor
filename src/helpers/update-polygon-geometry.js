import { showErrorMessage } from './show-error-message'

export const updatePolygonGeometry = async (polygonId, coordinates) => {
  const polygon = localStorage.getItemByName(polygonId)
  if (!polygon) return showErrorMessage(`Invalid polygon id: ${polygonId}`)

  Object.assign(polygon, {
    modified: Date.now(),
    geometry: Object.assign(polygon.geometry, { coordinates: [coordinates] })
  })

  localStorage.setItemByName(polygonId, polygon)
}

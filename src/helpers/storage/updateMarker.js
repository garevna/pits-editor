export function updateMarker (featureId, markerIndex, markerCoordinates) {
  const feature = this.getItemByName(featureId)
  const [coordinates] = feature.geometry.coordinates
  coordinates.splice(markerIndex, 1, markerCoordinates)
  Object.assign(feature, {
    modified: Date.now(),
    geometry: Object.assign(feature.geometry, { coordinates: [coordinates] })
  })
  this.setItemByName(featureId, feature)
}

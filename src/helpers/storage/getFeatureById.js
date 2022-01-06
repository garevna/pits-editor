export function getFeatureById (polygonId) {
  const polygon = this.getItemByName(polygonId)
  return {
    id: polygon._id,
    coordinates: polygon.geometry.coordinates[0],
    type: polygon.properties.typeOf
  }
}

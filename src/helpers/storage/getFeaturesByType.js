export function getFeaturesByType (type) {
  return this.getItemByName(type)
    .map(id => this.getItemByName(id))
    .map(feature => ({
      id: feature.properties.id,
      coordinates: feature.geometry.coordinates[0],
      type: feature.properties.typeOf
    }))
}

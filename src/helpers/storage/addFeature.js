export function addFeature (featureId, feature) {
  this.setItemByName(featureId, feature)
  const collection = this.getItemByName(feature.properties.typeOf)
  collection.push(featureId)
  this.setItemByName(feature.properties.typeOf, collection)
  this.emit({
    eventType: 'new-feature-added',
    featureId,
    type: feature.properties.typeOf,
    coordinates: feature.geometry.coordinates[0]
  })
}

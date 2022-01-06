export function updateFeatureType (featureId, type) {
  const feature = this.getItemByName(featureId)
  const oldCollection = this.getItemByName(feature.properties.typeOf)
  oldCollection.splice(oldCollection.indexOf(featureId), 1)
  this.setItemByName(feature.properties.typeOf, oldCollection)
  const newCollection = this.getItemByName(type)
  newCollection.push(featureId)
  this.setItemByName(type, newCollection)
  feature.properties.typeOf = type
  this.setItemByName(featureId, feature)
  this.emit({
    eventType: 'polygon-type-changed',
    featureId,
    type
  })
}

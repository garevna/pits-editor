export function updateFeatureId (oldValue, newValue) {
  const feature = this.getItemByName(oldValue)
  feature.properties.id = newValue
  this.setItemByName(newValue, feature)
  const collection = this.getItemByName(feature.properties.typeOf)
  const index = collection.indexOf(oldValue)
  collection.splice(index, 1, newValue)
  if (index !== -1) this.setItemByName(feature.properties.typeOf, collection)
  this.removeItem(oldValue)
}

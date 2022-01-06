export function removeFeatureById (polygonId) {
  const feature = this.getItemByName(polygonId)

  const types = feature ? [feature.properties.typeOf] : ['ServiceAvailable', 'BuildCommenced', 'ComingSoon']

  for (const type of types) {
    const list = this.getItemByName(type)
    const index = list.findIndex(id => id === polygonId)
    if (index === -1) continue
    list.splice(index, 1)
    this.setItemByName(type, list)
    break
  }
}

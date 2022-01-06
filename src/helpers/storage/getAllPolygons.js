export function getAllPolygons () {
  const polygons = {
    features: [],
    type: 'FeatureCollection'
  }
  polygons.features = ['ServiceAvailable', 'BuildCommenced', 'ComingSoon']
    .flatMap(collectionType => localStorage.getFeaturesByType(collectionType))
  return polygons
}

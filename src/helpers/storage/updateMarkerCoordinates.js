export function updateMarkerCoordinates (featureId, markerIndex, markerCoordinates) {
  this.updateMarker(featureId, markerIndex, markerCoordinates)
  this.emit({
    eventType: 'marker-coordinates-changed',
    featureId,
    markerIndex,
    markerCoordinates
  })
}

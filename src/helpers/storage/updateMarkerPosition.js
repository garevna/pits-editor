export function updateMarkerPosition (featureId, markerIndex, markerCoordinates) {
  this.updateMarker(featureId, markerIndex, markerCoordinates)
  this.emit({
    eventType: 'marker-position-changed',
    featureId,
    markerIndex,
    markerCoordinates
  })
}

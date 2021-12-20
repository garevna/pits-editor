export const createDrawLayer = function (context) {
  context.drawLayer = new context.__geo.Data({ map: context.map })
  context.drawLayer.setControls(['Polygon'])
  context.drawLayer.setStyle({
    editable: true,
    draggable: true,
    fillColor: '#f0f',
    strokeColor: '#f0f'
  })

  context.drawLayer.addListener('addfeature', function (event) {
    const featureId = `new-polygon-${Date.now()}`
    event.feature.setProperty('id', featureId)
    event.feature.setProperty('typeOf', 'ComingSoon')
    this.toGeoJson(function (json) {
      json.features.forEach((feature) => {
        feature._id = featureId
        localStorage.addFeature(featureId, feature)
        context.ComingSoon.push(context.buildPolygon(localStorage.getFeatureById(featureId), 'ComingSoon'))
      })
      context.drawLayer.setMap(null)
      delete context.drawLayer
      context.drawingMode = false
      context.container.dispatchEvent(new Event('drawing-mode-off'))
    })
  })
}

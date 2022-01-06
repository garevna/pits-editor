import {
  getFeatureById,
  setFeatureById,
  getFeaturesByType,
  getFeatureCoordinates,
  getFeatureType,
  addFeature,
  updateFeatureType,
  updateMarker,
  updateMarkerPosition,
  updateMarkerCoordinates,
  getAllPolygons,

  removeFeatureById,
  updateFeatureId,

  emit
} from '../helpers/storage'

Object.assign(Storage.prototype, {
  getItemByName: function (name) {
    return JSON.parse(this.getItem(name))
  },
  setItemByName: function (name, payload) {
    this.setItem(name, JSON.stringify(payload))
  },
  getFeatureById,
  setFeatureById,
  getFeaturesByType,
  getFeatureCoordinates,
  getFeatureType,
  addFeature,
  updateFeatureType,
  updateMarker,
  updateMarkerPosition,
  updateMarkerCoordinates,
  getAllPolygons,

  removeFeatureById,
  updateFeatureId,

  emit
})

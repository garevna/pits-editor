import { availablePolygonTypes } from '../config/polygon-types'
import { deletedPolygonsHandler } from '../data-handlers'
import { postPolygon, patchPolygon, deletePolygons } from './'

export const save = async (polygonId) => {
  const promises = []

  for (const type of availablePolygonTypes) {
    const collection = localStorage.getItemByName(type)
    for (const polygonId of collection) {
      if (polygonId.indexOf('new-polygon') !== -1) {
        await postPolygon(polygonId)
        continue
      }
      Object.keys(deletedPolygonsHandler()).includes(polygonId) || promises.push(patchPolygon(polygonId).catch(error => console.warn(error)))
    }
    await Promise.all(promises)
  }

  await deletePolygons()
}

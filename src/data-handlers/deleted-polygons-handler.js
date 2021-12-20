let deletedPolygons = {}

const resets = ['reset', 'clear', 'empty']

export const deletedPolygonsHandler = arg => {
  if (!arg) return deletedPolygons
  if (resets.indexOf(arg) !== -1) deletedPolygons = {}
  else Object.assign(deletedPolygons, arg)
}

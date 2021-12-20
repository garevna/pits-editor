export const getContainer = () => {
  let container = document.getElementById('dgtek-container-for-map')
  if (!container) {
    container = document.body.appendChild(document.createElement('div'))
    container.id = 'dgtek-container-for-map'
  }

  return container
}

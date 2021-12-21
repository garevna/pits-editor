const url = 'https://maps.googleapis.com/maps/api/js'

export const loadGoogleMapsScript = () => {
  const script = Array.from(document.getElementsByTagName('script')).find(item => item.src.indexOf(url) !== -1)
  if (script) script.remove()

  return new Promise((resolve) => {
    const script = document.body.appendChild(document.createElement('script'))
    script.src = `${url}?key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`
    script.onload = resolve.bind(null, true)
    script.onerror = resolve.bind(null, false)
  })
}

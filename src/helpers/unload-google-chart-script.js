// const url = 'https://maps.googleapis.com/maps/api/js'

const chartsURL = 'https://www.gstatic.com/charts'
// const mapsURL = 'https://maps.googleapis.com'

export const unloadGoogleChartScript = () => {
  const scripts = Array.from(document.getElementsByTagName('script'))
    .filter(script => script.src.indexOf(chartsURL) === 0)
  const links = Array.from(document.getElementsByTagName('link')).filter(link => link.href.indexOf(chartsURL) === 0)
  const elems = scripts.concat(links)
  elems.forEach(elem => elem.remove())
}

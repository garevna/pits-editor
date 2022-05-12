const url = 'https://www.gstatic.com/charts/loader.js'

export const loadGoogleChartScript = (resolve, reject) => {
  const script = Array.from(document.getElementsByTagName('script'))
    .find(item => item.src.indexOf(url) !== -1)
  if (script) script.remove()

  return new Promise(() => {
    const script = document.body.appendChild(document.createElement('script'))
    script.src = url
    script.onload = resolve && typeof resolve === 'function'
      ? resolve('loadGoogleChartScript: true')
      : () => true
    script.onerror = reject && typeof reject === 'function'
      ? reject('loadGoogleChartScript: false')
      : () => false
  })
}

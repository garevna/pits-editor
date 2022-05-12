// import { mapConfig, markerIcon, markerIconActive } from '@/config'
// import { loadGoogleChartScript } from '@/helpers'

import { mapConfig } from '@/config'
import { googleApiKeyHandler } from '@/data-handlers'

class MapChart {
  constructor (options) {
    this.container = options.container
    this.data = null
    this.map = null
    this.chartOptions = {
      mapType: 'styledMap',
      zoomLevel: 14,
      showTooltip: true,
      showInfoWindow: false,
      showControls: false,
      useMapTypeControl: true,
      enableScrollWheel: true,
      mapTypeIds: ['styledMap'],
      icons: {
        default: {
          normal: '/img/map-marker.svg',
          selected: '/img/marker-active.svg'
        }
      },
      maps: {
        styledMap: {
          name: 'DGtek pits',
          styles: mapConfig
        }
      }
    }

    window.google.charts.load('current', {
      packages: ['map'],
      mapsApiKey: googleApiKeyHandler()
    })
    window.google.charts.setOnLoadCallback(this.createMap.bind(this), response => console.warn('GOOGLE CHARTS ONLOAD', response))
  }

  selectMarker (event) {
    const { index } = event.detail
    this.map.setSelection([{ row: index, column: null }])
  }

  createMap () {
    this.map = new window.google.visualization.Map(this.container)
    window.addEventListener('pit-is-selected', this.selectMarker.bind(this))
  }

  getData (sourceData) {
    if (!window.google.visualization || !this.map) return setTimeout(this.getData.bind(this, sourceData), 100)
    const data = [['Lat', 'Long', 'Name']]
    for (const record of sourceData) {
      const { coordinates, address } = record
      data.push([coordinates[1], coordinates[0], address])
    }
    this.data = window.google.visualization.arrayToDataTable(data)

    window.google.visualization.events.addListener(this.map, 'select', function () {
      const index = this.map.getSelection()[0]?.row
      if (typeof index === 'number') {
        window.dispatchEvent(new CustomEvent('marker-is-selected', {
          detail: {
            index,
            _id: sourceData[index]._id
          }
        }))
      }
    }.bind(this))
  }

  drawPits () {
    if (!this.map || !this.data) return setTimeout(this.drawPits.bind(this), 100)

    this.map.draw(this.data, this.chartOptions)
  }

  redraw () {
    this.map.draw(this.data, this.chartOptions)
  }
}

export default MapChart

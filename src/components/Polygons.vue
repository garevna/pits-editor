<template>
  <v-container style="min-width: 900px; max-width: 1440px">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div id="dgtek-container-for-map"></div>
      </v-col>
      <v-col cols="12" md="4">
        <v-card flat class="my-4">
          <SelectedPolygon
            v-if="selectedPolygonId"
            :id="selectedPolygonId"
            :coordinates="coordinates"
            :type.sync="polygonType"
            :markerIndex.sync="selectedMarkerIndex"
            :markerCoordinates.sync="selectedMarkerCoordinates"
          />
        </v-card>
        <v-card flat class="mx-auto my-2 text-right">
          <!-- <v-progress-linear v-if="progress" value="progress" indeterminate color="#900" /> -->

          <v-btn v-if="selectedPolygonId" outlined color="#900" @click="deletePolygon">
            <v-icon color="#900">mdi-delete</v-icon>
            Remove polygon
          </v-btn>
          <v-btn v-else outlined color="#900" @click="newPolygon = true">
            <v-icon>mdi-vector-polygon</v-icon>
            Create new polygon
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-card-text v-if="apiKey && credentials" flat class="transparent">
      <v-btn dark color="#900" @click="saveData">
        <v-icon>mdi-content-save-all</v-icon>
        Save
      </v-btn>

      <v-btn v-if="!production" outlined @click="restoreFromProd" class="ml-4">
        <v-icon color="#900">mdi-backup-restore</v-icon>
        Restore data from prod
      </v-btn>
    </v-card-text>
    <v-card-text v-else>
      Access denied. You have no rights to save updates.
    </v-card-text>

    <!-- <MessagePopup /> -->
  </v-container>
</template>

<style scoped>
</style>

<script>

import { endpoints /*, availablePolygonTypes */ } from '@/config/polygon-types'
import { getContainer, getPolygonsByType, removePolygon, restore, save } from '@/helpers'
import { hostHandler, apiKeyHandler, credentialsHandler, production } from '@/data-handlers'

import '@/components/Storage.js'

import Map from '@/components/map.js'
import SelectedPolygon from '@/components/SelectedPolygon.vue'

export default {
  name: 'Polygons',
  components: {
    SelectedPolygon
  },

  props: ['host', 'apiKey', 'credentials'],

  data: () => ({
    production: production(),
    container: null,
    map: null,
    selectedPolygonId: null,
    coordinates: null,
    indexes: {},
    selectedMarkerIndex: null,
    selectedMarkerCoordinates: null,
    showButton: true,
    newPolygon: false,
    remove: false,
    save: false,

    // progress: false,

    testMode: location.origin !== 'https://dka.portal.dgtek.net'
  }),

  computed: {
    drawingModeAvailable () {
      return !!this.map && !this.map.drawingMode && !this.selectedPolygonId
    },

    polygonType: {
      get () {
        return localStorage.getFeatureType(this.selectedPolygonId)
      },
      set (val) {
        localStorage.updateFeatureType(this.selectedPolygonId, val)
      }
    }
  },

  watch: {
    selectedMarkerCoordinates: {
      deep: true,
      handler (val) {
        if (!val || !this.selectedMarkerIndex) return
        localStorage.updateMarkerCoordinates(this.selectedPolygonId, this.selectedMarkerIndex, val.map(item => parseFloat(item)))
      }
    },

    selectedMarkerIndex (val) {
      if (typeof val !== 'number') this.container.dispatchEvent(new Event('hide-all-markers'))
      else this.container.dispatchEvent(Object.assign(new Event('show-marker'), { markerIndex: val }))
    },

    newPolygon (val) {
      if (!val) return
      this.map.switchToDrawingMode()
      this.newPolygon = false
    },

    remove (val) {
      if (!val) return
      this.deletePolygon()
    }
  },

  methods: {
    restoreFromProd () {
      this.testMode && restore()
      localStorage.clear()
      this.getData()
    },

    async getData () {
      const promises = endpoints.map(endpoint => getPolygonsByType(endpoint))
      await Promise.all(promises)
      window.dispatchEvent(new Event('polygons-data-ready'))
    },

    selectedPolygonCallback (event) {
      if (!event.polygonId) return
      this.selectedPolygonId = event.polygonId
      this.coordinates = localStorage.getFeatureCoordinates(this.selectedPolygonId)
    },

    markerPositionChangedHandler (event) {
      this.coordinates[event.details.markerIndex] = event.details.markerCoordinates
      this.selectedMarkerIndex = event.details.markerIndex
      this.selectedMarkerCoordinates = event.details.markerCoordinates
    },

    emptySpaceClick (event) {
      this.selectedPolygonId = undefined
    },

    deletePolygon () {
      const type = removePolygon(this.selectedPolygonId)
      this.map.removePolygon(type, this.selectedPolygonId)

      localStorage.removeFeatureById(this.selectedPolygonId)

      this.selectedPolygonId = undefined
      this.remove = false
    },

    initMap () {
      window.removeEventListener('polygons-data-ready', this.initMap)

      this.container = getContainer()

      this.map = new Map({
        container: this.container,
        width: window.innerWidth / 2,
        height: 550,
        colors: {
          ServiceAvailable: '#090',
          BuildCommenced: '#000',
          ComingSoon: '#fa0'
        },
        center: { lat: -37.8357725, lng: 144.9738764 }
      })

      window.addEventListener('polygon-id-changed', this.map.changePolygonId.bind(this.map))

      const callbacks = {
        'polygon-selected': this.selectedPolygonCallback,
        'polygon-type-changed': this.map.changePolygonType.bind(this.map),
        'marker-coordinates-changed': this.map.changeMarkerCoordinates.bind(this.map),
        'marker-position-changed': this.markerPositionChangedHandler.bind(this),
        'show-marker': this.map.showMarker.bind(this.map),
        'empty-field-click': this.emptySpaceClick,
        'drawing-mode-on': this.switchDrawingMode.bind(this),
        'drawing-mode-off': this.switchDrawingMode.bind(this)
      }

      Object.keys(callbacks).forEach(event => this.container.addEventListener(event, callbacks[event]))
    },

    switchDrawingMode (event) {
      this.drawingMode = event.type === 'drawing-mode-on'
    },

    async saveData () {
      this.$root.$emit('progress-event', true)
      await save()
      this.$root.$emit('progress-event', false)
      this.$root.$emit('open-message-popup', {
        messageType: 'Polygons',
        messageText: 'Polygons data saved'
      })
    }
  },

  beforeMount () {
    hostHandler(this.host)
    apiKeyHandler(this.apiKey)
    credentialsHandler(this.credentials)

    localStorage.clear()
    this.getData()
  },

  mounted () {
    window.addEventListener('polygons-data-ready', this.initMap)
  }
}
</script>

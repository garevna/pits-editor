<template>
  <div class="main-container">
    <table width="100%">
      <tbody>
        <tr>
          <td rowspan="2" width="50%">
            <div id="dgtek-container-for-map"></div>
          </td>
          <td>
            <PitsList v-if="ready" :pits.sync="pits" />
          </td>
        </tr>
        <tr>
          <td>
            <span class="ml-12" style="font-size: 14px"> Total pits: <strong>{{ pits.length }}</strong> </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import {
  loadGoogleChartScript,
  unloadGoogleChartScript,
  getContainer,
  getPits
} from '@/helpers'

import { hostHandler, apiKeyHandler, credentialsHandler, production } from '@/data-handlers'

import MapChart from '@/components/MapChart.js'
import PitsList from '@/components/PitsList.vue'

export default {
  name: 'Pits',
  components: {
    PitsList
  },

  props: ['host', 'apiKey', 'credentials'],

  data: () => ({
    ready: false,
    pits: [],
    production: production(),
    container: null,
    map: null,

    testMode: location.origin !== 'https://dka.portal.dgtek.net'
  }),

  methods: {
    initMap (sourceData) {
      this.container = getContainer()

      this.$root.mapChart = new MapChart({
        container: this.container,
        width: window.innerWidth / 2,
        height: 550,
        center: { lat: -37.8357725, lng: 144.9738764 }
      })

      this.$root.mapChart.getData(this.pits)

      this.$root.mapChart.drawPits()
    },

    chartScriptLoaded () {
      this.$root.$emit('progress-event', false)
    },

    pitsReceived (data) {
      this.pits = data
      this.$root.$emit('progress-event', false)
      this.initMap(this.pits)
      this.ready = true
    },

    loadGoogleChartScriptError () {
      this.$root.$emit('progress-event', false)
      this.$root.$emit('open-error-popup', {
        errorType: 'Google services',
        errorMessage: 'Failed to fetch Google service script'
      })
    }
  },

  beforeCreate () {
    this.$root.$emit('progress-event', true)
    loadGoogleChartScript(this.chartScriptLoaded, this.loadGoogleChartScriptError)
  },

  beforeMount () {
    hostHandler(this.host)
    apiKeyHandler(this.apiKey)
    credentialsHandler(this.credentials)

    this.$root.$emit('progress-event', true)

    getPits(this.pitsReceived, this.errorCallback)
  },

  beforeDestroy () {
    unloadGoogleChartScript()
  }
}
</script>

<style>
  .main-container {
    min-width: 960px;
    max-width: 1440px;
    margin-left: 10%;
    margin-right: 10%;
  }
  #dgtek-container-for-map {
    margin-top: 80px;
    height: 640px;
  }
</style>

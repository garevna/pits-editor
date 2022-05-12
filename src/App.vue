<template>
  <v-app>
    <v-main id="dgtek-portal-pits-editor">
      <v-progress-linear
        v-if="progress"
        v-model="progress"
        indeterminate
      />
      <Pits
        v-if="showPits"
        :host="host"
        :apiKey="apiKey"
        :credentials="credentials"
      />
      <!-- <v-btn text @click="showPits = false">
        Close
      </v-btn> -->
    </v-main>
  </v-app>
</template>

<script>

import Pits from '@/components/Pits'

export default {
  name: 'App',

  components: {
    Pits
  },

  data: () => ({
    host: location.origin === 'https://portal.dgtek.net' ? 'https://portal.dgtek.net' : 'https://portal.staging.dgtek.net',
    apiKey: process.env.VUE_APP_AUTHORIZATION_KEY,
    credentials: process.env.VUE_APP_ADMIN_CREDENTIALS,
    progress: false,
    showPits: true
  }),

  methods: {
    showEventDetails (event) {
      console.log('EVENT:\n', event.details)
    },

    setProgress (event) {
      console.log('PROGRESS: ', event)
    }
  },

  beforeDestroy () {
    this.$root.$off('progress-event', this.setProgress)
    this.$root.$off('open-message-popup', data => console.log(data))
    this.$root.$off('open-error-popup', data => console.log(data))
    window.removeEventListener('pits-data-saved', this.showEventDetails)
  },

  mounted () {
    window.addEventListener('pits-data-saved', this.showEventDetails)
    this.$root.$on('progress-event', this.setProgress)
    this.$root.$on('open-message-popup', data => console.log(data))
    this.$root.$on('open-error-popup', data => console.log(data))
  }
}
</script>

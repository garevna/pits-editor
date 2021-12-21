<template>
  <v-app>
    <v-main id="dgtek-polygons">
      <Polygons
        :host="host"
        :apiKey="apiKey"
        :credentials="credentials"
      />
    </v-main>
  </v-app>
</template>

<script>

import Polygons from '@/components/Polygons'

export default {
  name: 'App',

  components: {
    Polygons
  },

  data: () => ({
    host: location.origin === 'https://portal.dgtek.net' ? 'https://portal.dgtek.net' : 'https://portal.staging.dgtek.net',
    apiKey: process.env.VUE_APP_AUTHORIZATION_KEY,
    credentials: process.env.VUE_APP_ADMIN_CREDENTIALS
  })
}
</script>

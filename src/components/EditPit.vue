<template>
  <!-- <transition> -->
    <v-card class="transparent ma-4 pa-8" style="border: inset 1px white!important">
      <span style="color: #888">Address:</span>
      <v-text-field
        v-model="address"
        hide-details
        outlined
        dense
        style="font-size: 10px;"
      />

      <span style="color: #888">Description:</span>
      <v-text-field
        v-model="description"
        hide-details
        outlined
        dense
        style="font-size: 10px;"
      />

      <table class="mt-5">
        <thead>
          <tr>
            <th rowspan="2" class="pr-12"><span style="color: #888">Ownership:</span></th>
            <th colspan="2"><span style="color: #888">Coordinates:</span></th>
          </tr>
          <tr>
            <th><span style="color: #888"> Lat </span></th>
            <th><span style="color: #888"> lng </span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="160" class="pr-12">
              <input type="checkbox" v-model="type" />
              <span style="padding-left: 16px; font-size: 12px; color: #999"> DGtek-Pits </span>
              <!-- <v-checkbox
                class="small-checkbox"
                label="DGtek"
                v-model="type"
                hide-details
                color="#900"
                true-value="DGtek-Pits"
                false-value="Other"
                style="font-size: 10px !important"
              /> -->
            </td>
            <td>
              <v-text-field
                v-model="lat"
                hide-details
                outlined
                dense
                style="font-size: 10px;"
              />
            </td>
            <td>
              <v-text-field
                v-model="lng"
                hide-details
                outlined
                dense
              />
            </td>
          </tr>
        </tbody>
      </table>

      <v-row justify="end" class="mt-5">
        <v-btn small dark @click="updatePit" color="#900">
          Update / save pit details
        </v-btn>
      </v-row>
    </v-card>
  <!-- </transition> -->
</template>

<script>

import { patchPit, postPit } from '@/helpers'

export default {
  name: 'SinglePit',

  props: ['pit'],

  computed: {
    lat: {
      get () {
        return this.pit.coordinates[1]
      },
      set (value) {
        this.$emit('update:pit', Object.assign(this.pit, { coordinates: [this.pit.coordinates[0], Number(value)] }))
      }
    },

    lng: {
      get () {
        return this.pit.coordinates[0]
      },
      set (value) {
        this.$emit('update:pit', Object.assign(this.pit, { coordinates: [Number(value), this.pit.coordinates[1]] }))
      }
    },

    type: {
      get () {
        return this.pit.wellType
      },
      set (value) {
        this.$emit('update:pit', Object.assign(this.pit, { wellType: value }))
      }
    },

    description: {
      get () {
        return this.pit.description
      },
      set (value) {
        this.$emit('update:pit', Object.assign(this.pit, { description: value }))
      }
    },

    address: {
      get () {
        return this.pit.address
      },
      set (value) {
        this.$emit('update:pit', Object.assign(this.pit, { address: value }))
      }
    }
  },

  methods: {
    updatePit () {
      this.$root.$emit('progress-event', true)
      this.pit._id
        ? patchPit(this.pit._id, this.pit, this.pitUpdated, this.pitUpdateError)
        : postPit(this.pit, this.pitUpdated, this.pitUpdateError)
    },

    pitUpdated (id) {
      this.$root.$emit('progress-event', false)
      this.$emit('update:pit', Object.assign(this.pit, { _id: id }))
      this.$root.$emit('open-message-popup', {
        messageType: 'Update/save pit',
        messageText: 'Pit data saved'
      })

      // this.$root.mapChart.getData(this.pits)
    },

    pitUpdateError () {
      this.$root.$emit('open-error-popup', {
        errorType: 'Update/save pit',
        errorMessage: 'Operation failed. Pit data not saved'
      })
    }
  }
}
</script>

<style>

input[type=checkbox]:checked:before {
  content: "\2580";
  display: block;
  position: absolute;
  color: #900;
  margin-top: -4px;
  margin-left: -4px;
  font-size: 18px;
  width: 25px;
  height: 25px;
  padding: 2px 4px;
  border: 2px solid #900;
  border-radius: 4px;
  background-color: #e9e9e9;
  vertical-align: top;
  transition: all 0.2s linear;
  cursor: pointer;
}

input[type=checkbox]:before {
  content: "";
  color: #efefef;
  display: block;
  position: absolute;
  margin-top: -4px;
  margin-left: -4px;
  width: 25px;
  height: 25px;
  border: 2px solid #bbb;
  border-radius: 4px;
  background-color: #e9e9e9;
  cursor: pointer;
}

th, td {
  vertical-align: middle;
}

td, input {
  font-size: 12px !important;
}

</style>

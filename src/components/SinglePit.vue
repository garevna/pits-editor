<template>
  <tr>
    <td>
      <v-text-field
        v-model="address"
        hide-details
        outlined
        dense
        style="font-size: 10px;"
      />
    </td>
    <td>
      <v-text-field
        v-model="description"
        hide-details
        outlined
        dense
        style="font-size: 10px;"
      />
    </td>
    <td>
      <v-text-field
        v-model="type"
        hide-details
        outlined
        dense
        style="font-size: 10px;"
      />
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
</template>

<script>

export default {
  name: 'SinglePit',

  props: ['pit'],

  computed: {
    lat: {
      get () {
        return this.pit.coordinates[1]
      },
      set (value) {
        this.$emit('update:pit', Object.assign(this.pit, { coordinates: [this.pit.coordinates[0], value] }))
      }
    },

    lng: {
      get () {
        return this.pit.coordinates[0]
      },
      set (value) {
        this.$emit('update:pit', Object.assign(this.pit, { coordinates: [value, this.pit.coordinates[1]] }))
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
  }
}
</script>

<style>

/* .vs__clear {
  display: none!important;
}
.vs--searchable .vs__dropdown-toggle {
    cursor: pointer!important;
    padding: 12px 16px!important;
    margin-bottom: 16px;
    background-color: #999!important;
    color: #fff!important;
}
.vs--single .vs__selected {
    background-color: transparent;
    border-color: transparent;
    color: #fff;
}
#vs1__listbox {
  line-height:180%;
} */

th, td {
  vertical-align: middle;
}

td, input {
  font-size: 12px !important;
  /* padding: 4px 8px !important; */
}

</style>

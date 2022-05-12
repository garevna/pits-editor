<template>
  <v-card flat class="transparent">
    <div class="text-right mb-5">
      <v-btn outlined color="#900" @click="createNewPit">
        <v-icon small>mdi-plus</v-icon>
        Add new pit
      </v-btn>
    </div>
    <v-card
      ref="scrollingTable"
      flat
      class="transparent ml-5"
      width="100%"
      height="550"
      style="overflow-y: auto;"
    >
      <table>
        <tbody>
          <tr
            v-for="(item, index) of pits"
            :key="index"
            :class="expanded === index + 1 || selected === index + 1 ? 'expanded-table-row' : null"
            :ref="`row-${index + 1}`"
            @click="selectPit(index)"
          >
            <td width="100%">
              <table width="100%">
                <tr>
                  <td width="32">
                    <v-icon
                      v-if="item._id"
                      small
                      color="#900"
                      @click="deletePit(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </td>
                  <td width="320">
                    {{ item.address }}
                  </td>
                  <td width="120">
                    {{ item.coordinates[1] }}
                  </td>
                  <td width="120">
                    {{ item.coordinates[0] }}
                  </td>
                  <td width="32">
                    <v-icon
                      small
                      color="#999"
                      @click="expanded = expanded === index + 1 ? null : index + 1"
                    >
                      mdi-chevron-down
                    </v-icon>
                  </td>
                </tr>
              </table>
              <transition name="fade" :duration="{ enter: 500, leave: 300 }">
                <EditPit v-if="expanded === index + 1" :pit.sync="item" />
              </transition>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
  </v-card>
</template>

<script>

import { removePit } from '@/helpers'

import EditPit from '@/components/EditPit.vue'

export default {
  name: 'PitsList',

  components: {
    EditPit
  },

  props: ['pits'],

  data () {
    return {
      expanded: null,
      selected: null
    }
  },

  methods: {
    selectPit (index) {
      if (this.selected === index + 1) return
      this.selected = index + 1
      window.dispatchEvent(new CustomEvent('pit-is-selected', {
        detail: {
          index,
          _id: this.pits[index]._id
        }
      }))
    },

    deletePit (item) {
      if (!item._id) return
      const index = this.pits.findIndex(pit => pit._id === item._id)
      removePit(item._id, this.pitRemoved)
      this.pits.splice(index, 1)
      this.expanded = null
    },

    createNewPit () {
      const date = new Date().toISOString()

      this.pits.unshift({
        coordinates: [144.9, -37.8],
        address: 'New pit',
        description: `Created: ${date.slice(0, 10)} at ${date.slice(11, 19)}`,
        wellType: 'DGtek-Pits'
      })
      this.expanded = 1
      this.$nextTick(() => {
        this.$refs.scrollingTable.$el.scrollTop = 0
      })
    },

    pitRemoved () {
      this.$root.$emit('progress-event', false)
      this.$root.$emit('open-message-popup', {
        messageType: 'Remove pit',
        messageText: 'Pit deleted'
      })

      this.$root.mapChart.getData(this.pits)
    },

    pitRemoveError () {
      this.$root.$emit('progress-event', false)
      this.$root.$emit('open-error-popup', {
        errorType: 'Remove pit',
        errorMessage: 'Operation failed. Pit not deleted'
      })
    },

    getSelectedPitId (event) {
      const { index } = event.detail
      this.selected = index + 1
      const ref = this.$refs[`row-${index + 1}`][0]
      this.$nextTick(() => ref.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' }))
    }
  },

  beforeMount () {
    window.addEventListener('marker-is-selected', this.getSelectedPitId)
  },

  beforeDestroy () {
    window.removeEventListener('marker-is-selected', this.getSelectedPitId)
  }
}
</script>

<style>

/* .selected-table-row {
  background: #efefef;
  color: #900;
  font-weight: bold;
} */

.expanded-table-row {
  background: #efefef;
  color: #900;
  font-weight: bold;
}

.expanded-table-row > td {
  padding: 12px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.vs__clear {
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
}

th, td {
  vertical-align: middle;
}

td, input {
  font-size: 12px !important;
  /* padding: 4px 8px !important; */
}

</style>

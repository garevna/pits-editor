<template>
  <v-card flat class="transparent" max-width="480" max-height="500">
    <v-select :options="availablePolygonTypes" v-model="localType" />
    <v-card flat class="transparent" max-height="420" style="overflow: auto">
      <table>
        <thead>
          <tr>
            <th><small> # </small></th>
            <th><small> Lng </small></th>
            <th><small> Lat </small></th>
            <th><small> Add point </small></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(point, index) in points" :key="index" @mouseover="$emit('update:markerIndex', index)">
            <td>{{ index }}</td>
            <td>
              <v-text-field
                v-model="points[index][0]"
                @input="inputHandler(index, 0, $event)"
                hide-details
                outlined
                dense
                style="font-size: 10px;"
              />
            </td>
            <td>
              <v-text-field
                v-model="points[index][1]"
                @input="inputHandler(index, 1, $event)"
                hide-details
                outlined
                dense
              />
            </td>
            <td>
              <v-btn
                  @click="addNewPoint(index)"
                  color="#09b"
                  text
              >
                <b style="font-size: 24px"> + </b>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
  </v-card>
</template>

<script>

import { updatePolygonGeometry } from '@/helpers'
import { availablePolygonTypes } from '@/config'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'SelectedPolygon',
  components: {
    vSelect
  },

  props: ['id', 'type', 'coordinates', 'markerIndex', 'markerCoordinates'],

  data () {
    return {
      points: null,
      availablePolygonTypes,
      localType: null
    }
  },

  computed: {
    typeOfPolygon: {
      get () {
        return this.type
      },
      set (val) {
        this.$emit('update:type', val)
      }
    }
  },

  watch: {
    coordinates: {
      deep: true,
      immediate: true,
      handler (val) {
        this.points = val
      }
    },
    markerCoordinates: {
      deep: true,
      handler (val) {
        if (this.markerIndex >= 0) this.points.splice(this.markerIndex, 1, val)
      }
    },
    type: {
      immediate: true,
      handler (val) {
        this.localType = val
      }
    },
    localType (val) {
      this.$emit('update:type', val)
    }
  },

  methods: {
    addNewPoint: function (index) {
      const next = (index === this.points.length - 1) ? 0 : index + 1
      const coords = [
        (this.points[index][0] + this.points[next][0]) / 2,
        (this.points[index][1] + this.points[next][1]) / 2
      ]
      this.points.splice(next, 0, coords)
      updatePolygonGeometry(this.id, this.points)

      this.$parent.$parent.map.updateSelectedPolygonPath(this.points)
      this.$parent.$parent.map.createMarkers()
    },

    inputHandler (pointIndex, coord, val) {
      this.points[pointIndex][coord] = parseFloat(val)
      this.$emit('update:markerCoordinates', this.points[pointIndex])
    }
  }
}
</script>

<style>

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

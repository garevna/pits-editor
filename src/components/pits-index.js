import Vue from 'vue'
import Pits from './Pits.vue'

const Components = {
  Pits
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

const myTransition = createSimpleTransition('long-fade-transition')

Vue.component('long-fade-transition', myTransition)

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        secondary: '#28602F',
      },
      light: {
        secondary: '#28602F',
      },
    },
  },
})

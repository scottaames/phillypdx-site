import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

const myTransition = createSimpleTransition('long-fade-transition')

Vue.component('long-fade-transition', myTransition)

Vue.use(Vuetify)

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 600,
  },
  theme: {
    themes: {
      dark: {
        primary: '#3F51B5',
        secondary: '#28602F',
      },
      light: {
        primary: '#3F51B5',
        secondary: '#28602F',
      },
    },
  },
})

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
        primary: '#264653',
        secondary: '#28602F',
        tertiary: '#779cab',
        yellowish: '#e9c46a',
        orangish: '#F4A261',
        reddish: '#E76F51',
        peach: '#F9E7E4',
      },
      light: {
        primary: '#264653',
        secondary: '#28602F',
        tertiary: '#779cab',
        yellowish: '#e9c46a',
        orangish: '#F4A261',
        reddish: '#E76F51',
        peach: '#F9E7E4',
      },
    },
  },
})

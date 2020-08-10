import App from './App.vue'
import VStripeElements from 'v-stripe-elements/lib'
import Vue from 'vue'
import VueMask from 'v-mask'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
Vue.use(VStripeElements)

Vue.use(VueMask)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')

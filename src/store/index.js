import MenuService from '../services/MenuService.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    menu: [],
    cart: [],
    locations: [
      {
        name: 'Sisters',
        path: '/order/Sisters',
        mapString:
          'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJx0HAk4Uxv1QRcu5TyyUWg4Q&key=' +
          process.env.VUE_APP_GOOGLE_MAPS_API_KEY +
          '&zoom=16',
        googleMapsLink: 'https://g.page/Philadelphias?share',
        appleMapsLink:
          'http://maps.apple.com/?daddr=352+E+Hood+Ave+Suite+B,+Sisters,+OR+97759',
        hours: [
          ['Monday', '11:00am–7:00pm'],
          ['Tuesday', '11:00am–7:00pm'],
          ['Wednesday', '11:00am–7:00pm'],
          ['Thursday', '11:00am–7:00pm'],
          ['Friday', '11:00am–7:00pm'],
          ['Saturday', '11:00am–7:00pm'],
          ['Sunday', '11:00am–7:00pm'],
        ],
        phone: '(541) 904-4154',
        address: '352 E Hood Ave Suite B, Sisters, OR 97759',
      },
      {
        name: 'Portland',
        path: '/order/Portland',
        mapString:
          'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJY3FFMcELlVQRy4FlPy6H0oA&key=' +
          process.env.VUE_APP_GOOGLE_MAPS_API_KEY +
          '&zoom=16',
        googleMapsLink: 'https://goo.gl/maps/fQbZGeAySWE51h6Z6',
        appleMapsLink:
          'http://maps.apple.com/?daddr=6410+SE+Milwaukie+Ave,+Portland,+OR+97202',
        hours: [
          ['Monday', '9:00am–10:00pm'],
          ['Tuesday', '9:00am–10:00pm'],
          ['Wednesday', '9:00am–10:00pm'],
          ['Thursday', '9:00am–10:00pm'],
          ['Friday', '9:00am–11:00pm'],
          ['Saturday', '9:00am–11:00pm'],
          ['Sunday', '9:00am–9:00pm'],
        ],
        phone: '(503) 239-8544',
        address: '6410 SE Milwaukie Ave, Portland, OR 97202',
      },
      {
        name: 'West Linn',
        path: '/order/West Linn',
        mapString:
          'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJuYToqIpzlVQRXgkZN-aNM5U&key=' +
          process.env.VUE_APP_GOOGLE_MAPS_API_KEY +
          '&zoom=16',
        googleMapsLink: 'https://goo.gl/maps/kD5LfE4aivUA2srD8',
        appleMapsLink:
          'http://maps.apple.com/?daddr=18625+Willamette+Dr,+West+Linn,+OR+97068',
        hours: [
          ['Monday', '9:00am–9:00pm'],
          ['Tuesday', '9:00am–9:00pm'],
          ['Wednesday', '9:00am–9:00pm'],
          ['Thursday', '9:00am–9:00pm'],
          ['Friday', '9:00am–10:00pm'],
          ['Saturday', '9:00am–10:00pm'],
          ['Sunday', '9:00am–8:00pm'],
        ],
        phone: '(503) 699-4130',
        address: '18625 Willamette Dr, West Linn, OR 97068',
      },
    ],
  }),
  mutations: {
    SET_MENU(state, menu) {
      state.menu = menu
    },
    ADD_TO_CART(state, item) {
      state.cart.push(item)
    },
    REMOVE_FROM_CART(state, itemIdx) {
      if (itemIdx >= 0) {
        state.cart.splice(itemIdx, 1)
      }
    },
    CLEAR_CART(state) {
      state.cart = []
    },
  },
  actions: {
    async fetchMenu({ commit }) {
      return await MenuService.getMenu()
        .then((response) => {
          commit('SET_MENU', response.data)
        })
        .catch((error) => {
          console.log('Error fetching menu: ', error.response)
        })
    },
    addToCart({ commit }, item) {
      if (item) commit('ADD_TO_CART', item)
    },
    removeFromCart({ commit }, itemIdx) {
      commit('REMOVE_FROM_CART', itemIdx)
    },
    clearCart({ commit }, item) {
      commit('CLEAR_CART', item)
    },
  },
  getters: {
    locations: (state) => state.locations,
    sistersHours: (state) => state.locations[0].hours,
    portlandHours: (state) => state.locations[1].hours,
    westlinnHours: (state) => state.locations[2].hours,
    menu: (state) => state.menu,
    cart: (state) => state.cart,
  },
  modules: {},
})

import MenuService from '../services/MenuService.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    menu: [],
    cartPrice: 0,
    cart: [],
    lineItems: [],
    orderDetails: {
      name: 'Scott Ames',
      phone: '(951) 541-1070',
      email: 'scottaames@gmail.com',
      orderMethod: 'Pick-up',
      day: 'Today',
      time: '12:36 PM',
      instructions: 'Make sure to leave off the onions please!',
    },
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
    SET_ORDER_DETAILS(state, orderDetails) {
      state.orderDetails = orderDetails
    },
    ADD_TO_CART(state, item) {
      let repeats = state.cart.filter((cartItem) => cartItem.name === item.name)
      let isRepeat = true
      if (repeats.length > 0) {
        let i = 0
        while (i < repeats.length) {
          if (repeats[i].price === item.price) {
            if (
              repeats[i].addOns != null &&
              item.addOns != null &&
              repeats[i].addOns.length === item.addOns.length &&
              repeats[i].without.length === item.without.length
            ) {
              item.addOns.forEach((addOn, index) => {
                if (addOn.name !== repeats[i].addOns[index].name) {
                  isRepeat = false
                }
              })
              item.without.forEach((withoutItem, index) => {
                if (withoutItem.name !== repeats[i].without[index].name) {
                  isRepeat = false
                }
              })
            }
            if (isRepeat) {
              let idx = state.cart.indexOf(repeats[i])
              state.cart[idx].quantity += item.quantity
              return
            }
          }
        }
      }
      state.cart.push(item)
    },
    REMOVE_FROM_CART(state, item) {
      let itemIdx = state.cart.indexOf(item)
      state.cart.splice(itemIdx, 1)
    },
    CLEAR_CART(state) {
      state.cart = []
    },
    ADD_CART_PRICE(state, amount) {
      state.cartPrice += amount
    },
    SUBTRACT_CART_PRICE(state, amount) {
      state.cartPrice -= amount
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

    addToCart({ dispatch, commit }, item) {
      commit('ADD_TO_CART', item)
      dispatch('addCartPrice', item.price)
    },
    removeFromCart({ dispatch, commit }, item) {
      commit('REMOVE_FROM_CART', item)
      dispatch('subtractCartPrice', item.price)
    },
    clearCart({ commit }, item) {
      commit('CLEAR_CART', item)
    },
    addCartPrice({ commit }, amount) {
      commit('ADD_CART_PRICE', amount)
    },
    subtractCartPrice({ commit }, amount) {
      commit('SUBTRACT_CART_PRICE', amount)
    },
    setOrderDetails({ commit }, orderDetails) {
      commit('SET_ORDER_DETAILS', orderDetails)
    },
  },
  getters: {
    locations: (state) => state.locations,
    sistersHours: (state) => state.locations[0].hours,
    portlandHours: (state) => state.locations[1].hours,
    westlinnHours: (state) => state.locations[2].hours,
    menu: (state) => state.menu,
    cart: (state) => state.cart,
    cartPrice: (state) => state.cartPrice,
    orderDetails: (state) => state.orderDetails,
  },
  modules: {},
})

import { mapGetters } from 'vuex'

export const loading = {
  ...mapGetters(['loading']),
}
export const cart = {
  ...mapGetters(['cart']),
}
export const cartPrice = {
  ...mapGetters(['cartPrice']),
}
export const cartPriceFormatted = {
  ...mapGetters(['cartPriceFormatted']),
}
export const loadMessage = {
  ...mapGetters(['loadMessage']),
}
export const menu = {
  ...mapGetters(['menu']),
}

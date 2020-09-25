import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:4242`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  confirmCardPayment(clientSecret, source) {
    return apiClient.post('/confirm', {
      clientSecret: clientSecret,
      source: source,
    })
  },
  createPaymentIntent(cart, card) {
    return apiClient.post('/create-payment-intent', { items: cart, card: card })
  },
}

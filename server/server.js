const express = require('express')
const app = express()
const { resolve } = require('path')

const stripe = require('stripe')(process.env.VUE_APP_STRIPE_SECRET_KEY)

app.use(express.static('../public'))
app.use(express.json())

//redundant calculate order amount here to ensure no manipulation has occurred on client-side
const calculateOrderAmount = (items) => {
  let total = 0
  items.forEach((item) => {
    total += item.price * 100
  })
  return total
}

app.get('/secret', async (req, res) => {
  const { items } = req.body
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
  })
  res.json({ client_secret: paymentIntent.client_secret })
})

app.listen(8000, () => {
  console.log('Node server listening on port 8000')
})

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const env = require('dotenv').config({ path: './.env' })
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const cors = require('cors')
const { resolve } = require('path')

const menuDb = require('./db/menu.json')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('hi')
})

app.get('/menu', (req, res) => {
  res.send({
    menu: menuDb.menu,
  })
})

//redundant calculate order amount here to ensure no manipulation has occurred on client-side
const calculateOrderAmount = (items) => {
  let total = 0
  if (items.length > 0) {
    items.forEach((item) => {
      total += item.price * 100
    })
  }
  return total
}

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body
  try {
    const intent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd',
    })
    console.log(intent)
    res.send({
      clientSecret: intent.client_secret,
    })
  } catch (e) {
    res.send({ error: e.message })
  }
})

app.post('/pay', async (req, res) => {
  const { paymentMethodId, paymentIntentId, items, currency } = req.body

  const orderAmount = calculateOrderAmount(items)

  try {
    let intent
    if (paymentMethodId) {
      // Create new PaymentIntent with a PaymentMethod ID from the client.
      intent = await stripe.paymentIntents.create({
        amount: orderAmount,
        currency: currency,
        payment_method: paymentMethodId,
        confirmation_method: 'manual',
        confirm: true,
        // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
        // to take advantage of new authentication features in mobile SDKs
        //use_stripe_sdk: useStripeSdk,
      })
      // After create, if the PaymentIntent's status is succeeded, fulfill the order.
    } else if (paymentIntentId) {
      // Confirm the PaymentIntent to finalize payment after handling a required action
      // on the client.
      intent = await stripe.paymentIntents.confirm(paymentIntentId)
      // After confirm, if the PaymentIntent's status is succeeded, fulfill the order.
    }
    res.send(generateResponse(intent))
  } catch (e) {
    // Handle "hard declines" e.g. insufficient funds, expired card, etc
    // See https://stripe.com/docs/declines/codes for more
    res.send({ error: e.message })
  }
})

const generateResponse = (intent) => {
  // Generate a response based on the intent's status
  switch (intent.status) {
    case 'requires_action':
    case 'requires_source_action':
      // Card requires authentication
      return {
        requiresAction: true,
        clientSecret: intent.client_secret,
      }
    case 'requires_payment_method':
    case 'requires_source':
      // Card was not properly authenticated, suggest a new payment method
      return {
        error: 'Your card was denied, please provide a new payment method',
      }
    case 'succeeded':
      // Payment is complete, authentication not required
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
      console.log('💰 Payment received!')
      return { clientSecret: intent.client_secret }
  }
}

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`))

/* app.get('/create-payment-intent', async (req, res) => {
  const items = req.body.cart
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
  })
  res.send({ clientSecret: paymentIntent.client_secret })
})

app.listen(process.env.PORT || 8000, () => {
  console.log('Node server listening on port 8000')
}) */

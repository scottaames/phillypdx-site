import os
import uuid

import stripe
from flask import Flask, jsonify, request
from flask_cors import CORS

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')

@app.route('/order', methods=['POST'])
def create_charge():
    post_data = request.get_json()
    amount = round(float(post_data.get('book')['price']) * 100)
    stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
    charge = stripe.Charge.create(
        amount=amount,
        currency='usd',
        card=post_data.get('token'),
        description=post_data.get('book')['title']
    )
    response_object = {
        'status': 'success',
        'charge': charge
    }
    return jsonify(response_object), 200

@app.route('/order/<charge_id>')
def get_charge(charge_id):
    stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
    response_object = {
        'status': 'success',
        'charge': stripe.Charge.retrieve(charge_id)
    }
    return jsonify(response_object), 200


if __name__ == '__main__':
    app.run()
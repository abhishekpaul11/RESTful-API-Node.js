This is a RESTful API for a pizza-delivery company. It acts as an HTTP/HTTPS endpoint. It handles REST Api requests to perform the following actions:
-create, update, view or delete an user
-create, extend, view or destroy sign-in tokens
-access the menu (item id, price and name)
-add, remove items to the cart
-place an order and charge the total amount via registered credit card (by sending an HTTPS request to the API endpoint of Stripe-https://stripe.com/in)
-send the order receipt to the user's mail via an HTTPS request to the API endpoint of Mailgun - https://www.mailgun.com/
The entire API is coded using pure Node.js, without any supplementary libraries like npm and the like.

Given below are the legal user interactions.

Recognised Paths:

1. user - deals with user transactions. Legal methods include:
    a. POST: create a new user 
        Payload: name, password, email, address (ALL fields required) 
    b. GET: returns user object
        Query: email,
        Header: token
    c. PUT: edit an user object 
        Payload: email (Required), name, password, address (any ONE is required)
        Header: token
    d. DELETE: delete the user object
        Query: email
        Header: token

2. tokens - creates sign-in tokens for users. Legal methods include:
    a. POST: create an user token
        Payload: email, password (ALL required)
    b. GET: get token details
        Query: id (token)
    c. PUT: extend the token validity by an hour
        Payload: id (token), extend (boolean),
    d. DELETE: delete an existing token
        Query: id (token)

3. menu - menu of the pizza company. Legal methods include
    a. GET: get the menu of the company
        Query: email,
        Header: token

4. cart - add/delete items to a cart. Legal methods include:
    a. PUT: add an item
        Payload: item (id), quantity,
        Header: token
    b. GET: returns the cart object
        Header: token
    c. DELETE: remove an item
        Query: item (id)
        Header: token

5. order - place an order. Legal methods include:
    a. POST: place an order and return the final price as per the cart
        Header: token
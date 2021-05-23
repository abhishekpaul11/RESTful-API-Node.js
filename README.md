This is a RESTful API for a pizza-delivery company. It acts as an HTTP/HTTPS endpoint. It handles REST Api requests to perform the following actions:  
-> create, update, view or delete an user  
-> create, extend, view or destroy sign-in tokens    
-> access the menu (item id, price and name)   
-> add, remove items to the cart  
-> place an order and charge the total amount via registered credit card (by sending an HTTPS request to the API endpoint of Stripe-https://stripe.com/in)    
-> send the order receipt to the user's mail via an HTTPS request to the API endpoint of Mailgun - https://www.mailgun.com/  
The entire API is coded using pure Node.js, without any supplementary libraries like npm and the like.  
  
Given below are the legal user interactions.  
  
Recognised Paths:  
  
1. user - deals with user transactions. Legal methods include:  
    a. POST: create a new user  
        &emsp;&emsp;Payload: name, password, email, address (ALL fields required).  
    b. GET: returns user object  
        &emsp;&emsp;Query: email,    
        &emsp;&emsp;Header: token      
    c. PUT: edit an user object  
        &emsp;&emsp;Payload: email (Required), name, password, address (any ONE is required)  
        &emsp;&emsp;Header: token  
    d. DELETE: delete the user object  
        &emsp;&emsp;Query: email  
        &emsp;&emsp;Header: token  

2. tokens - creates sign-in tokens for users. Legal methods include:  
    a. POST: create an user token  
        &emsp;&emsp;Payload: email, password (ALL required)  
    b. GET: get token details  
        &emsp;&emsp;Query: id (token)  
    c. PUT: extend the token validity by an hour  
        &emsp;&emsp;Payload: id (token), extend (boolean),  
    d. DELETE: delete an existing token  
        &emsp;&emsp;Query: id (token)  
  
3. menu - menu of the pizza company. Legal methods include  
    a. GET: get the menu of the company  
        &emsp;&emsp;Query: email,  
        &emsp;&emsp;Header: token  
  
4. cart - add/delete items to a cart. Legal methods include:  
    a. PUT: add an item  
        &emsp;&emsp;Payload: item (id), quantity,  
        &emsp;&emsp;Header: token  
    b. GET: returns the cart object  
        &emsp;&emsp;Header: token  
    c. DELETE: remove an item  
        &emsp;&emsp;Query: item (id)  
        &emsp;&emsp;Header: token  
  
5. order - place an order. Legal methods include:  
    a. POST: place an order and return the final price as per the cart  
       &emsp;&emsp;Header: token

# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
GET / - homepage

- GET /products - READ all products
- GET /products/:productName - READ specific product by product name
- POST /products - CREATE product
- DELETE /products - DELETE product by productId

- GET /users - READ all users
- GET /users/:firstname - READ specific user by firstname
- POST /users/register - CREATE user
- POST /users/login - LOGIN user
- DELETE /users - DELETE specific user by firstname

- GET /orders - READ all orders
- GET /orders/:userId - READ orders by userId
- POST /orders - CREATE order
- DELETE /orders - DELETE specific order by orderId
- POST /orders/products - CREATE order with status productId quantity and userid
- DELETE /orders/products - DELETE order by orderId

#### Products
- Index 
- Show (args: product name)
- Create (args: product name, product price) [token required]
- Delete (args: product id) [token required]

#### Users
- Index [token required]
- Show (args: firstname) [token required]
- Create (args: firstname, lastname, password)
- Delete (args: firstname)

#### Orders
- index
- Show (args: user id)
- Create order (args: status,quantity,product_id,user_id) [token required]
- Delete (args: order id) [token required]

## Data Shapes
#### Product
- id SERIAL PRIMARY KEY
- name VARCHAR
- price integer

#### User
- id SERIAL PRIMARY KEY
- firstName text
- password VARCHAR

#### Orders
- id SERIAL PRIMARY KEY
- status text
- quantity integer
- user_id REFERENCES users(id)
- product_id REFERENCES products(id)


/* Replace with your SQL commands */
CREATE TABLE users(
 id SERIAL PRIMARY KEY,
 firstName text,
 lastName text,
 password VARCHAR(1024)
);
CREATE TABLE products (
    id SERIAL PRIMARY  KEY,
    name  VARCHAR(150),
    price integer
);
CREATE TABLE orders
(
    id      SERIAL PRIMARY KEY,
    status  VARCHAR(100),
    user_id bigint REFERENCES users(id)
);
CREATE TABLE order_products
(
    id         SERIAL PRIMARY KEY,
    quantity   integer,
    order_id   bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
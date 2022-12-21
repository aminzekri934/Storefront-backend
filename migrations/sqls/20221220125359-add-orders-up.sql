/* Replace with your SQL commands */
CREATE TABLE orders(
    id      SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    status  VARCHAR(100),
    quantity integer,
    user_id bigint REFERENCES users(id)
);
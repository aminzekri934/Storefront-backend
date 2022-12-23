# Storefront Backend Project
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 
## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
our application use  the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion
scripts:
- npm run start(to start the server)
- npm run test (for unit testing)
- psql postgres[localhost]
- CREATE DATABASE postgres;(to create the database)
- \c postgres(to connect to it) and \q (to deconnect)
- npm run test (to run migrations for test database)
- npm run dev (to run migrations for developing database)

## DATABASE PORT:
5432

## Environment variables:
- ENV=dev
- POSTGRES_HOST=localhost
- POSTGRES_DB=postgres
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=password123
- POSTGRES_TEST_DB=posygres_test
- BCRYPT_SALT_ROUNDS=10
- BCRYPT_PEPPER=5Ffja@9spfaA#
- JWT_TOKEN_SECRET=Sog@*Fos2*7

## CONNECTING TO THE DATABASE:
- ..sh
- CREATE USER postgres WITH PASSWORD 'password123'; 
- **or sql :
- CREATE DATABASE postgres;
- CREATE DATABASE postgres_test;
- **granting all privileges in both database tu user:
- GRANT ALL PRIVILEGES ON DATABASE postgres to postgres;
- GRANT ALL PRIVILEGES ON DATABASE postgres to postgres_test;

## Contributer:
Amine zekri 
## Licence:
no licence is required

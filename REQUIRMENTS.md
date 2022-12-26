# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

[== End point are clarified in Readme file ==]

## Data Shapes

### Product

- id : SERIAL
- product_name : VARCHAR(50)
- price : NUMERIC(10,2)
- description : TEXT
- created_at : TIMESTAMP

### User

- id : SERIAL
- user_name : VARCHAR(255)
- email : UNIQUE VARCHAR(255)
- user_password : VARCHAR(255)
- created_at : TIMESTAMP

### Orders

- id : SERIAL
- user_id_ : FOREIGN KEY INTEGER
- product_id : FOREIGN KEY INTEGER
- quantity : INTEGER
- fulfilled : BOOLEAN
- created_at : TIMESTAMP

## Schema

### Tables

| Schema |      Name      | Type  |  Owner   |
|--------+----------------+-------+----------|
| public | users          | table | postgres |
| public | products       | table | postgres |
| public | orders         | table | postgres |
| public | order_products | table | postgres |

### users

|    Column     |            Type             | Nullable |              Default              | Storage  |
|---------------+-----------------------------+----------+-----------------------------------+----------|
| id            | integer                     | not null | nextval('users_id_seq'::regclass) | plain    |
| user_name_    | character varying(255)      | not null |                                   | extended |
| email         | character varying(255)      | not null |                                   | extended |
| user_password | character varying(255)      | not null |                                   | extended |
| created_at    | timestamp without time zone | not null | CURRENT_TIMESTAMP                 | plain    |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id__fkey" FOREIGN KEY (user_id_) REFERENCES users(id) ON DELETE CASCADE

### products

|    Column    |            Type             | Nullable |               Default                | Storage  |
|--------------+-----------------------------+----------+--------------------------------------+----------|
| id           | integer                     | not null | nextval('products_id_seq'::regclass) | plain    |
| product_name | character varying(50)       | not null |                                      | extended |
| price        | numeric(10,2)               | not null |                                      | main     |
| description  | text                        |          |                                      | extended |
| created_at   | timestamp without time zone | not null | CURRENT_TIMESTAMP                    | plain    |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE

### orders

|   Column   |            Type             | Collation | Nullable |              Default               | Storage |
|------------+-----------------------------+-----------+----------+------------------------------------+---------|
| id         | integer                     |           | not null | nextval('orders_id_seq'::regclass) | plain   |
| user_id_   | integer                     |           | not null |                                    | plain   |
| created_at | timestamp without time zone |           | not null | CURRENT_TIMESTAMP                  | plain   |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id__fkey" FOREIGN KEY (user_id_) REFERENCES users(id) ON DELETE CASCADE
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE

### order_products

|   Column   |  Type   | Collation | Nullable |                  Default                   | Storage |
|------------+---------+-----------+----------+--------------------------------------------+---------|
| id         | integer |           | not null | nextval('order_products_id_seq'::regclass) | plain   |
| order_id   | integer |           | not null |                                            | plain   |
| product_id | integer |           | not null |                                            | plain   |
| quantity   | integer |           | not null |                                            | plain   |
| fulfilled  | boolean |           | not null | false                                      | plain   |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE

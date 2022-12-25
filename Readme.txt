# Initiating

Please make sure you have a .env file with those parameters inside:
POSTGRES_HOST = ***
POSTGRES_DB = ***
POSTGRES_USER = ***
POSTGRES_PASSWORD = ***
POSTGRES_TEST_DB =  ***
POSTGRES_PORT = ***
JWT_SECRET = ***
SALT = ***
PEPPER = ***
ENV = dev (|test)

# scripts

primary:
prettier: Run prettier
eslint: Run eslint
build: build the js files
jasmine: Run jasmine
start: start the server
migrate: migrate the dev db up
migrate-test: migrate the test db up
migrate-undo: migrate the dev db up
migrate-undo-test: migrate the test db down

main:
test: Migrate the test db and build the project, run the tests
orient: Run prettier and eslint
initiate: build and run the server for the first time: Would migrate the db
go: build and run the server

# endpoints

users:
[GET]/:id - get user by id [Need Token]
[DELETE]/:id - delete user by id [Need Token]
[POST]/authenticate - authenticate user
Body:
{
    "user_name_": "***",
    "email": "***@***.***",
    "user_password": "***"
}
[PATCH]/:id - update user by id [Need Token]
Body:
{
    "user_name_": "***",
    "email": "***@***.***",
    "user_password": "***"
}
[GET]/ - get all users [Need Token]
[POST]/ - create user
Body:
{
    "user_name_": "***",
    "email": "***@***.***",
    "user_password": "***"
}

products:
[GET]/:id - get product by id
[DELETE]/:id - delete product by id [Need Token]
[PATCH]/:id - update product by id [Need Token]
Body:
{
    "product_name": "***",
    "price": "***.**",
    "description": "***"
}
[GET]/ - get all products
[POST]/ - create product [Need Token]
Body:
{
    "product_name": "***",
    "price": "***.**",
    "description": "***"
}

orders:
[PATCH]/products/:id/fulfill - mark product as fulfilled [Need Token]
[GET]/all - get all orders [Need Token]
[GET]/:id - get order by id [Need Token]
[DELETE]/:id - delete order by id [Need Token]
[PATCH]/:id - update order by id [Need Token]
Body:
{
    "user_id_": "***"
}
[GET]/ - get all orders by user [Need Token]
[POST]/ - create order [Need Token]
Body:
{
    "user_id_": "***",
    "products": [
        {
            "product_id": "***",
            "quantity": "***"
        },
        {
            "product_id": "***",
            "quantity": "***"
        }
    ]
}
[POST]/:id/products - add product to order [Need Token]
Body:
{
    "product_id": "***",
    "quantity": "***"
}
[DELETE]/products/:order_product_id - delete product from order [Need Token]
[PATCH]/products/:order_product_id - update product from order [Need Token]
Body:
{
    "order_id": "***"
    "product_id": "***",
    "quantity": "***"
}
[GET]/:id/products/ - get all products from order [Need Token]

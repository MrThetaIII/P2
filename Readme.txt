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
[POST]/authenticate - authenticate user [Need Token]
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
[PATCH]/fulfill/:id - mark order as fulfilled [Need Token]
[GET]/all - get all orders [Need Token]
[GET]/:id - get order by id [Need Token]
[DELETE]/:id - delete order by id [Need Token]
[PATCH]/:id - update order by id [Need Token]
Body:
{
    "product_id": "***",
    "quantity": "***"
}
[GET]/ - get all orders for the current user [Need Token]
[POST]/ - create order [Need Token]
Body:
{
    "product_id": "***",
    "quantity": "***"
}

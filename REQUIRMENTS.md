# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

*End point are clarified in Readme file*

## Data Shapes

#### Product

- id : SERIAL
- product_name : VARCHAR(50)
- price : NUMERIC(10,2)
- description : TEXT
- created_at : TIMESTAMP

#### User

- id : SERIAL
- user_name : VARCHAR(255)
- email : UNIQUE VARCHAR(255)
- user_password : VARCHAR(255)
- created_at : TIMESTAMP

#### Orders

- id : SERIAL
- user_id_ : FOREIGN KEY INTEGER
- product_id : FOREIGN KEY INTEGER
- quantity : INTEGER
- fulfilled : BOOLEAN
- created_at : TIMESTAMP

DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE	bamazon;

CREATE TABLE products (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
product VARCHAR(100) NULL,
dept VARCHAR(100) NULL,
price DECIMAL(6,2) NULL,
quantity INT NULL
);

INSERT INTO products(product, dept, price, quantity)
VALUES ("cord", "electronics", 14.99, 200);

INSERT INTO products(product, dept, price, quantity)
VALUES ("headphone", "electronics", 24.99, 100);

INSERT INTO products(product, dept, price, quantity)
VALUES ("wall charger", "electronics", 9.99, 150);

INSERT INTO products(product, dept, price, quantity)
VALUES ("surge protector", "electronics", 19.99, 70);

INSERT INTO products(product, dept, price, quantity)
VALUES ("pan", "home goods", 8.99, 1000);

INSERT INTO products(product, dept, price, quantity)
VALUES ("pot", "home goods", 12.99, 1500);

INSERT INTO products(product, dept, price, quantity)
VALUES ("spatula", "home goods", 2.99, 4000);

INSERT INTO products(product, dept, price, quantity)
VALUES ("microwave", "home goods", 49.99, 500);

INSERT INTO products(product, dept, price, quantity)
VALUES ("skirt", "clothing", 7.99, 200);

INSERT INTO products(product, dept, price, quantity)
VALUES ("blouse", "clothing", 16.99, 200);
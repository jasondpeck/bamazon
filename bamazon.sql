CREATE DATABASE bamazon;
USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products (PRIMARY KEY(itemID), itemID INTEGER(10) AUTO_INCREMENT NOT NULL, productName VARCHAR(50), departmentName VARCHAR(50), price INTEGER(10), stockQuantity INTEGER(10));

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ('PS4', 'Gaming Consoles', 99, 50);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ('Call of Duty WW2', 'PS4 Games', 30, 100);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ('Madden 19', 'PS4 Games', 30, 100);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ('Remy Martin Louis XIII', 'Baller Drinks', 5000, 5);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ('Yamazaki 50 Year Release', 'Baller Drinks', 100000, 1);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ('Red Baron Pepperoni', 'Frozen Food', 1, 1000);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ('Alienware Area 51', 'Beast Mode Computers', 2999, 10);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ('1991 IBM PC with Intel 486', 'Beast Mode Computers', 5000, 1);


SELECT * FROM products;
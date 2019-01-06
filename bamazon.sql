CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL
);

INSERT INTO products ( product_name , department_name , price,stock_quantity)
VALUES  ("Apple AirPods","Electronics",159.00,37),
        ("Oral-B 7000 Electric Toothbrush ","Beauty & Personal Care",119.94,50),
        ("Organic Chamomile Tea","Grocery & Gourmet Food",6.25,200),
        ("Boosted Stealth Electric Skateboard","Sport & Outdoor",1599.99,8),
        ("How to Train Your Dragon","Movies & TV",13.99,123),
        ("Maxi Health Kosher Vitamins","Health & Household",313.47,67),
        ("Prada Leather Shoulder Bag","Women's Fashion",2194.50,1),
        ("Paper Mate Pens,Bold Point(1.4mm)","Office Products",1.74,335),
        ("The Harry Potter Wand","Toys & Games",49.99,99),
        ("JavaScript and JQuery","Books",33.99,20);
        
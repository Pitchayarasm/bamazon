# Bamazon
  The app will take orders from customers and deplete stock from the store's inventory. Also, allow manager to add new products and add more quantity in the stock.


----------------------------------------------------------------------------------------------------------------------------


## How does it work?

1. `BamazonCustomer.js`

    * Displays all the products in the store.

    * Asks customers which product they would like to purchase by ID number. (The customers can only input ID number that exist)

    * Asks customers the quantity they would like to purchase. (The customers can only input integer that greater than zero)

      * If there is a sufficient amount of the product in stock, it will return the total for that purchase. And updates the stock quantity.
      * Else, it will tell the customer that there isn't enough of the product.


----------------------------------------------------------------------------------------------------------------------------


2. `BamazonManager.js`

    * Start with 4 choices:
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add New Product
        
    * If the manager selects `View Products for Sale`, it will display all of the products in the store including all of their details.

    * If the manager selects `View Low Inventory`, it will display all the products that its Stock Quantity less than five.

    * If the manager selects `Add to Inventory`, it will display all the product and ask the manager to select a product and add inventory.

    * If the manager selects `Add New Product`, it will ask the manager to add a completely new product to the store.
    
    
----------------------------------------------------------------------------------------------------------------------------

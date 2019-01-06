var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('cli-table');
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "bamazon"
});

inquirer.prompt({
    type : "list",
    message : "Please select one of the following options..",
    choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"],
    name : "choices"
  }).then(function(res){
        var userPicked = res.choices
        switch(userPicked) {
            case "View Products for Sale":
            product();
            break;

            case "View Low Inventory":
            low();
            break;

            case "Add to Inventory":
            add();
            break;

            case "Add New Product":
            all();
            break;
        }
  });

function product() {
    connection.query(
        "SELECT * FROM products",
        function(err,res){
            var Table = new table({
                head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
            });
            if (err) throw err;
            console.log("\n *´¨`*:•. *.:｡✿*ﾟ‘ﾟ*¤°•★•:*´¨`*:•. * Welcome to BAMAZON *´¨`*:•. *.:｡✿*ﾟ‘ﾟ*¤°•★•:*´¨`*:•. *´¨`*");
            console.log("------------------------------------------------------------------------------------------------");
            for (var i = 0 ; i < res.length ; i++) {
                Table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            console.log(Table.toString());
        }
    )
}

function low() {
    connection.query(
        "SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ? ",
        [ 0 , 5 ],
        function(err,res){
            var Table = new table({
                head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
            });
            if (err) throw err;
            console.log("\n *´¨`*:•. *.:｡✿*ﾟ‘ﾟ*¤°•★•:*´¨`*:•. * Welcome to BAMAZON *´¨`*:•. *.:｡✿*ﾟ‘ﾟ*¤°•★•:*´¨`*:•. *´¨`*");
            console.log("------------------------------------------------------------------------------------------------");
            for (var i = 0 ; i < res.length ; i++) {
                Table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            console.log(Table.toString());
        }
    )
}

function add() {
    connection.query(
        "SELECT * FROM products",
        function(err,res){
            var Table = new table({
                head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
            });
            var items = res.length+1
            if (err) throw err;
            console.log("\n *´¨`*:•. *.:｡✿*ﾟ‘ﾟ*¤°•★•:*´¨`*:•. * Welcome to BAMAZON *´¨`*:•. *.:｡✿*ﾟ‘ﾟ*¤°•★•:*´¨`*:•. *´¨`*");
            console.log("------------------------------------------------------------------------------------------------");
            for (var i = 0 ; i < res.length ; i++) {
                Table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
                console.log(Table.toString());
            inquirer.prompt([{
                type : "input",
                message : "What is the ID of the item you would like to add inventory?",
                name : "id",
                validate : function(input) {
                    if ( input > 0 && input < items) {
                        if(isNaN(input) || input % 1 !== 0 ){
                            return false;
                        } else {
                            return true;
                        } 
                    } else {
                        return false
                    }               
                }
            },
            {
                type : "input",
                message : "How many would you like to add?",
                name : "qty",
                validate : function(input) {
                    if(isNaN(input) || input % 1 !== 0 ){
                        return false;
                    } else {
                        return true;
                    } 
                }
            }]).then(function(userInput) {
                var id = userInput.id - 1;
                var qty = parseInt(userInput.qty);
                var stock = res[id].stock_quantity;
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{ 
                    stock_quantity : ( stock + qty ) 
                    },
                    { item_id : res[id].item_id 
                    }],
                    function(err,res) {
                        if (err) throw err;
                        console.log("Congratulations, quantity added!");
                    });
            });
        })
}

function all() {
    inquirer.prompt([
        {
            type : "input",
            message : "Please input your item..",
            name : "item"
        },
        { 
            type : "input",
            message : "Please input Department..",
            name : "department"
        },
        {
            type : "input",
            message : "Please input Price..",
            name : "price",
            validate : function(input) {
                if ( input > 0 ) {
                    if(isNaN(input) ){
                        return false;
                    } else {
                        return true;
                    } 
                } else {
                    return false
                }               
            }
        },
        { 
            type : "input",
            message : "Please input Quantity..",
            name : "qty",
            validate : function(input) {
                if ( input > 0 ) {
                    if(isNaN(input) || input % 1 !== 0 ){
                        return false;
                    } else {
                        return true;
                    } 
                } else {
                    return false
                }               
            }
        }
    ]).then(function(res){
        var itemI = res.item ;
        var depI = res.department ;
        var priceI = res.price;
        var qtyI = res.qty;

        connection.query(
            "INSERT INTO products SET ?",
            [{ 
                product_name : itemI,
                department_name : depI,
                price : priceI,
                stock_quantity : qtyI
            }],
            function(err,res) {
                if (err) throw err ;
                console.log("Congratulations, 1 item added!");
        })
    });
}
var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "bamazon"
});

function start() {
    connection.query(
        "SELECT * FROM products",
        function(err,res){
            var items = res.length+1
            if (err) throw err;
            console.log("\n *¤°•★•:*´¨`*:•. *.:｡✿*ﾟ‘ﾟ*¤°•★•:*´¨`*:•. * Welcome to BAMAZON *¤°•★•:*´¨`*:•. *.:｡✿*ﾟ‘ﾟ*¤°•★•:*´¨`*:•. *");
            console.log("------------------------------------------------------------------------------------------------------------");
            for (var i = 0 ; i < res.length ; i++) {
                console.log("ID number : " + res[i].item_id + "    " + " Item : " + res[i].product_name);
                console.log("Department : " + res[i].department_name)
                console.log("Price($) : " + res[i].price + "    " + " Quantity : " + res[i].stock_quantity)
                console.log("------------------------------------------------------------------------------------------------------------")
            }
            inquirer.prompt([{
                type : "input",
                message : "What is the ID of the item you would like to purchase?",
                name : "id",
                validate : function(input) {
                    if ( input > 0 && input < items ) {
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
                message : "How many would you like to purchase?",
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
                var qty =parseInt(userInput.qty);
                var totalCost = res[id].price * qty ;
                var stock = res[id].stock_quantity;
                if ( qty <= stock ) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{ 
                    stock_quantity : ( stock - qty ) 
                    },
                    { item_id : res[id].item_id 
                    }],
                    function(err,res) {
                        if (err) throw err;
                        console.log("Your total is $" + totalCost + ", Thank you for shopping with us! ")
                    });
                } else {
                    console.log("Sorry, Insufficient quantity!")
                }
                setTimeout (function() {
                    nextPurchase()},1000
                );
            });
        })
}

function nextPurchase() {
    inquirer.prompt([{
        type: "confirm",
        message: "Would you like to purchase another item?",
        name: "ask"
    }]).then(function(input){
        if ( input.ask ) {
            start();
        } else {
            console.log("Thank you for visiting, See you soon!");
        }
    });
}

start();


var mysql = require("mysql2");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Successful. Connection id: ' + connection.threadId);
    showProducts();
    promptCustomer();
});


function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        // connection.end();
    })
}

function promptCustomer() {

    inquirer.prompt([{
            type: "input",
            name: 'id',
            message: "Enter product id number (1-10)"
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter the quantity you'd like to purchase"
        }
    ]).then(function(res) {

        if (res.id > 10) {
            console.log('Error. Product ID must be between 1 and 10');
            connection.end();
        } else if (res.quantity > 70) {
            // else if (res.quantity > quantity) {
            console.log("Sorry. Insufficient Quantity  avaiable for purchase.");
        } else {
            console.log('product id # ' + res.id);
            console.log('Quantity requested ' + res.quantity);
            placeOrder();

        }
    }).catch(function(err) {
        console.log(err);
    });
}

function placeOrder() {
    connection.query('SELECT id, quantity FROM products', function(err, res) {
        if (err) throw err;
        console.log(res);
    });
}
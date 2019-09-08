var mysql = require("mysql2");

var inquirer = require("inquirer");

var id_user, quantity_user, id_db, quantity_db, price, totalCost, newQuantity_db;

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
    });
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

        id_user = res.id;
        var x = id_user - 1;
        quantity_user = res.quantity;

        if (id_user > 10) {
            console.log('Error. Product ID must be between 1 and 10');
            connection.end()
        };
        connection.query('SELECT id, quantity, price FROM products', function(err, res) {

            if (err) throw err;
            quantity_db = res[x].quantity;
            console.log('quant db ' + quantity_db);

            if (quantity_user > quantity_db || quantity_db <= 0) {

                console.log("Sorry. Insufficient Quantity  avaiable for purchase.");
                connection.end();
            } else {
                console.log('product id # ' + id_user);
                console.log('Quantity requested ' + quantity_user);
                placeOrder();

            }
        });



    }).catch(function(err) {
        console.log(err);
        connection.end();
    });
}

function placeOrder() {
    connection.query('SELECT id, quantity, price FROM products', function(err, res) {
        if (err) throw err;

        var x = id_user - 1;
        id_db = res[x].id;
        quantity_db = res[x].quantity;
        price = res[x].price;
        totalCost = quantity_user * price;
        quantity_db -= quantity_user;


        var sql = 'UPDATE products SET quantity = ' + quantity_db + ' WHERE id = ' + id_db;
        console.log(sql);

        connection.query(sql, function(err, res) {
            if (err) throw err;
            // console.log(res);
        });
        console.log('\n---------------------------------------------');
        console.log('Product Id: ' + id_db + ' Updated in-Stock Quantity: ' + quantity_db);
        orderConfirmation();

    });
}

function orderConfirmation() {
    console.log('\n---------Order Confirmation--------- ' +
        '\nProduct id: ' + id_user +
        '\nQuantity: ' + quantity_user +
        '\nPrice per unit: $' + price +
        '\nYour total is $' + totalCost);

    connection.end();
}
var inqurier = require('inquirer');

var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"
});

//connect to server. if successful console threadId & call function
connection.connect(function(err) {
    if (err) throw err;
    console.log('Success. Connection id: ' + connection.threadId);
    promptManager();
});

//console  menu selections
function promptManager() {

    inqurier.prompt([{

        type: 'list',
        name: 'menu',
        message: 'Manager Menu. Select one: ',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']

    }]).then(function(resp) {

        console.log('\n###########################################');
        console.log('You selected: ' + resp.menu + '\n');
        doThis(resp.menu);

    }).catch(function(err) {
        if (err) throw err;
        connection.end();
    });
}

function doThis(action) {

    switch (action) {
        case 'View Products for Sale':
            productsForSale();
            break;
        case 'View Low Inventory':
            lowInventory();
            break;
        case 'Add to Inventory':
            addToInventory();
            break;
        case 'Add New Product':
            addNewProd();
            break;
    };
}

function productsForSale() {

    showProducts();
}

//function will make a query to database & return requested fields
//function will loop through array of objects in products table and 
//will console which products have a quantity of less than 5  
function lowInventory() {

    connection.query('SELECT id, product, quantity FROM products', function(err, resp) {

        if (err) throw err;

        //loop through each item in products array
        for (var i = 0; i < resp.length; i++) {

            var x = resp[i];
            var id = x.id
            var product = x.product;
            var numItems = x.quantity;

            if (numItems < 5) {
                console.log('\n############ Results for Low Inventory ################');
                console.log('Products with quantity less than 5');
                console.log('Id: ' + id + ' Product: ' + product + ' Quantity: ' + numItems);
            };
        };
    });
}

function addToInventory() {

    inqurier.prompt([{
        type: 'input',
        name: 'id',
        message: "Enter product id to add to its in-stock quantity"
    }, {
        type: 'input',
        name: 'addMore',
        message: 'Enter the amount you want to add to quantity'
    }]).then(function(resp) {

        console.log('\n#####################################################');
        console.log('Adding ' + resp.addMore + ' units to Id #' + resp.id);
    }).catch(
        function(err) {
            console.log(err);
            connection.end();
        });
}

function updateInventory(id, newQuantity) {

    var sql = 'UPDATE products SET quantity = ' + newQuantity + ' WHERE id = ' + id;
    console.log(sql);
    connection.query(sql, function(err, res) {

        if (err) throw err;

        console.log('\n############ Updated Inventory ################');
        console.log(res);
        console.log('Product Id: ' + id +
            ' Updated Quantity: ' + newQuantity);
    });
}

function addNewProd() {

    console.log('add new');

}

function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
    });
}
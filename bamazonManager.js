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

function promptManager() {
    //console  menu selections
    inqurier.prompt([{

        type: 'list',
        name: 'menu',
        message: 'Manager Menu. Select one: ',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']

    }]).then(function(resp) {

        console.log(resp.menu);
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

    console.log('4 sale');
    showProducts();

}

function lowInventory() {

    console.log('low stock');

}

function addToInventory() {

    console.log('add to ');

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
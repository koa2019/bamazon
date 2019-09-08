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

        // console.log('\n###########################################');
        console.log('You selected: ' + resp.menu);
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
            addToQuantity();
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

        console.log('\n------ Results for Products with quantity less than 5 ------');

        var count = 0;

        //loop through each item in products array
        for (var i = 0; i < resp.length; i++) {

            var x = resp[i];
            var id = x.id
            var product = x.product;
            var numItems = x.quantity;

            if (numItems < 5) {
                count += 1;
                console.log('Id: ' + id + ' Product: ' + product + ' Quantity: ' + numItems);
            };
        };
        if (count === 0) {
            console.log('\nThere are no products with a quantity less than 5.')
        };
    });
}

//function will prompt user for 2 inputs & will return console.log of inputs and pass them to the updateInventory()
function addToQuantity() {

    inqurier.prompt([{
        type: 'input',
        name: 'id',
        message: "Enter product id to add to its in-stock quantity"
    }, {
        type: 'input',
        name: 'addMore',
        message: 'Enter the amount you want to add to quantity'

    }]).then(function(resp) {

        var addMore = resp.addMore;
        var id = resp.id;

        console.log('\n#################### Please Wait ################');
        updateInventory(id, addMore);

    }).catch(
        function(err) {
            console.log(err);
            connection.end();
        });
}

//function accepts 2 paramaters & queries database with an update request
//if req successful then consoles results of update
function updateInventory(id, newQuantity) {

    console.log('Adding ' + newQuantity + ' units to Id #' + id);

    var sql = 'UPDATE products SET quantity = ' + newQuantity + ' WHERE id = ' + id;
    console.log(sql);
    connection.query(sql, function(err, res) {

        if (err) throw err;

        console.log('\n############ Updated Inventory ################');
        // console.log(res);
        console.log(res.affectedRows + ' Updated Row');
        showUpdatedProduct(id);
    });
}

function showUpdatedProduct(id) {

    var id_db = id - 1;

    connection.query('SELECT id, product, quantity FROM products', function(err, resp) {

        if (err) throw err;

        console.log(resp[id_db]);
    });
}

function addNewProd() {

    inqurier.prompt([{
            type: 'input',
            name: 'product',
            message: "Enter Item's Name"
        },
        {
            type: 'input',
            name: 'quantity',
            message: "Enter Item's Quantity"
        },
        {
            type: 'input',
            name: 'price',
            message: "Enter Item's Price in this format 123.99"

        }
    ]).then(function(resp) {

        var name = resp.product;
        var quantity = resp.quantity;
        var price = resp.price;

        addToDatabase(name, quantity, price);

    }).catch(function(err) {
        console.log(err);
        connection.end();
    });
}

function addToDatabase(product, quantity, price) {

    console.log(product + '--' + quantity + '--' + price);

}

function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
    });
}
var inqurier = require('inquirer');

var mysql = require('mysql2');

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
    console.log('Success. Connection id: ' + connection.threadId);
    showProducts();
});

inqurier.prompt([{

    type: 'list',
    name: 'menu',
    message: 'Manager Menu. Select one: ',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']

}]).then(function(resp) {

    console.log(resp);

}).catch(function(err) {

    if (err) throw err;
    connection.end();
});

function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
    });
}
var inquirer = require("inquirer");

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
    console.log(res)
})
var mysql = require("mysql");
var prompt = require("prompt");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jhsP4263',
  database: 'bamazon'
});

var select = function(){

    connection.query("SELECT * FROM products", function(err, result) {
        return (listings(result));
      
      });

    setTimeout(function() {
        prompt.get(['itemID', 'Quantity'], function (err, result) {
            var shopperItem = result.itemID;
            var shopperQuantity = result.Quantity;

            inventory(shopperItem, shopperQuantity);
            setTimeout(function() {select();}, 1000);

        });
    }, 750);
}

var inventory = function (id, quantity){
    connection.query('SELECT * FROM products WHERE itemID = ' + id, function (err, result){
        if (err) throw err;

        var total = result[0].price * quantity;

        var inventory = result[0].stockQuantity - quantity;

        if (inventory < 0){
            console.log('Insufficient quantity. We only have ' + result[0].stockQuantity + ' left.');
        } else {
            console.log('You purchased ' + quantity + ' ' + result[0].productName + ' for $' + total);
            console.log('We have ' + inventory + ' ' + result[0].productName + ' left.')
            update(id, inventory)
        }
    });
}

// If you're not updating the database after a sale you're inventory will be off. Then you'll have to spend all holiday weekend manually checking the inventory as your fellow coworkers goof off leaving you with all the work. 

var update = function(id, quantity){
    connection.query('update products set stockQuantity = ' + quantity + ' where itemID = ' + id, function(err, result) {
        if (err) throw err;
    });
}

// Making that Bamazon Inventory look top notch! 

function listings(items){
    for (var i = 0; i < items.length; i++) {
        console.log('------------------------');
        console.log('ItemID: ' + items[i].itemID);
        console.log('Item: ' + items[i].productName);
        console.log('Department: ' + items[i].departmentName);
        console.log('Price: $' + items[i].price);
    }
    console.log('------------------------');
}


// Connecting to the Bamazon Database
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err);
        return;
    }
});

// INITIATE THE SPLINTER SEQUENCE
select();
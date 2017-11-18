var mysql = require("mysql");
var prompt = require("prompt");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bamazon'
});

var select = function(){

    connection.query("SELECT * FROM products", function(err, result) {
        return (listings(result));
      
      });

    setTimeout(function() {
        prompt.get(['itemID', 'Quantity'], function (err, result) {
            var product = result.itemID;
            var qty = result.Quantity;

            inventory(product, qty);
            setTimeout(function() {select();}, 1000);

        });
    }, 1000);
}

var inventory = function (id, quantity){
    connection.query('SELECT * FROM products WHERE itemID = ' + id, function (err, result){
        if (err) throw err;

        var total = result[0].price * quantity;

        var inventoryLeft = result[0].stockQuantity - quantity;

        if (inventoryLeft < 0){
            console.log('Insufficient quantity. We only have ' + result[0].stockQuantity + ' left.');
        } else {
            console.log('You purchased ' + quantity + ' ' + result[0].productName + ' for $' + total);
            console.log('We have ' + inventoryLeft + ' ' + result[0].productName + ' left.')
            update(id, inventoryLeft)
        }
    });
}

var update = function(id, quantity){
    connection.query('update products set stockQuantity = ' + quantity + ' where itemID = ' + id, function(err, result) {
        if (err) throw err;
    });
}

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

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err);
        return;
    }
});

select();
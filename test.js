var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  
//   mainMenu();
});

function afterConnection(){
    connection.query('SELECT * FROM employee', 
     
     function (err, res){
        if (err) throw err;
        console.table(res)
        connection.end();
    })
}




// simple display of all employees


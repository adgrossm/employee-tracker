var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
var promisemysql = require("promise-mysql");

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
  console.log("Welcome to Employee Tracker + \n");
  mainMenu();
});

function mainMenu() {
    inquirer.prompt({
        
            type: "list",
            message: "What would you like to do?",
            choices: ['View all employees', 'View departments', 'View roles','Add employee', 
            'Add role', 'Add department', 'Update employee role',
            'Remove employee',
             
            ],
            name: "option"
        
    

        // {
        //     type: "list",
        //     message: "What would you like to do?",
        //     choices: ['View all employees', new inquirer.Separator(), 'View employees by department', 'Add employee', 
        // 'Update employee role', 'View all roles',
        // 'View all departments', 'Add a department', 'Add a role'],
        //     name: "option"
        // }
        // {
        //     type: "input",
        //     message: "What's the ID of the employee?",
        //     name: "id"
        // }
    
    // ]).then(answers => {
    //     console.log(answers)
    //     connection.query("SELECT * FROM employee WHERE id = " +  answers.option, (err, res) => {
    //         if (err) throw err;
    //         console.table(res);
    //         mainMenu()
    //     });
    // });
 
    }).then((answers) => {
        // switch case which changes based on user selection
    switch(answers.option){
        case "View all employees":
            viewAllEmployees();
            break;

        case "View departments":
            viewDepartments();
            break;

        case "View roles":
            viewRole();
            break;

        case "Add employee":
            addEmployee();
            break;

        case "Add department":
            addDepartment();
            break;    

        case "Add role":
            addRole();
            break;     

        case "Update employee role":
            updateEmployeeRole();
            break;

        case "Remove employee":
            removeEmployee();
            break;
    }
});
}

// functions to be called in switch case after user makes selection
function viewAllEmployees(){
    // let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";
    connection.query("SELECT first_name, last_name, title, salary, department FROM employee AS employee INNER JOIN role AS role ON employee.role_id = role.id INNER JOIN department AS department ON role.department_id = department.id",
      (err, res) => {
            if (err) throw err;
            console.log("\n");
            // display the query to view all employees
            console.table(res);
            // back to main menu
            mainMenu()
        });
    }

function viewDepartments(){
        // let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";
    connection.query("SELECT * FROM department",
        (err, res) => {
            if (err) throw err;
            console.log("\n");
                // display the query to view all employees
            console.table(res);
                // back to main menu
            mainMenu()
        }
    );
}

function viewRole(){
    // let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";
connection.query("SELECT * FROM role",
    (err, res) => {
        if (err) throw err;
        console.log("\n");
            // display the query to view all employees
        console.table(res);
            // back to main menu
        mainMenu()
    }
);
}




// this returns only the employee table
// var query = connection.query("SELECT * FROM employee" , (err, res) => {
//     if (err) throw err;
//     console.table(res);
//     console.log(answers);
    
// });
// console.log(query.sql);
// });




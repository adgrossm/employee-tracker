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

function addDepartment(){
    inquirer.prompt({
        type: "input",
        message: "What department would you like to add?",
        name: "newDeptName"
    }).then(function(answers){
        connection.query("INSERT INTO department (department) VALUES (?)", answers.newDeptName, function(err, res){
            if (err) throw err;
            // console.table(res)
            mainMenu()
        })
    })
}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "What's the name of the role?",
            name: "newRoleName"
        },
        {
            type: "input",
            message: "What's the salary for this role?(only numbers)",
            name: "newSalary"
        },
        {
            type: "list",
            message: "What is the deparment id number",
            choices: [1, 2, 3, 4, 5, 6, 7],
            name: "newDeptId"
        }
    ]).then(function(answers){
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.newRoleName, answers.newSalary, answers.newDeptId], function (err, res){
            if (err) throw err;
            mainMenu()
        });
    });
}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "empFirstName"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "empLastName"
        },
        {
            type: "list",
            message: "What is the employee's role id?",
            choices: [1, 2, 3, 4, 5, 6 , 7, 8],
            name: "empRoleId"
        },


    ]).then(function(answers){
        connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)", [answers.empFirstName, answers.empLastName, answers.empRoleId],function (err, res){
        if (err) throw err;
        console.table(viewAllEmployees())
        mainMenu()

        });
    });
}

function updateEmployeeRole(){
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to update their role?",
            choices: ["Miller", "Brady", "Heather", "Tim", "John", "Ringo", "Gerry", "Clark"],
            name: "updateRoleFirstName"
        },
        {
            type: "list",
            message: "What role do you want to update to?",
            choices: [1, 2, 3, 4, 5, 6, 7, 8],
            name: "updateRoleId"
        }
    ]).then(function(answers){
        connection.query("UPDATE employee SET role_id=? WHERE first_name= ?", [answers.updateRoleId, answers.updateRoleFirstName],function(err, res){
            if (err) throw err;
            console.log(viewAllEmployees())
            mainMenu()
        })
    })
}







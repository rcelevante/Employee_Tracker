// DEPENDENCIES
const chalk = require('chalk');
const inquirer = require('inquirer');
const ctable = require('console.table');
const mysql = require('mysql');

// DATABASE CONNECTION
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'password',
    database: 'employee_db'
});
connection.connect(function(err) {
    if (err) throw err;
    //logoTxt();
    start();
});


function logoTxt(){
    console.log(
        logo({
            name: 'Employee Tracker',
            font: 'block',
            lineChars: 10,
            padding: 2,
            margin: 3,
            borderColor: 'grey',
            logoColor: 'bold-green',
            textColor: 'green',
        })
        .render()
    );
}

// PROMPTS
function start() {
    inquirer
      .prompt({
        name: "view",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees",
                  "View All Department",
                  "View All Role",
                  "View All Employees by Role", 
                  "View All Employees by Manager",
                  "Add Employees",
                  "Remove Employees",
                  "Update Employees Role",
                  "Update Employees Manager",
                  "View Budget"

                ]
      })

      .then(function(answer) {
       
        // VIEW EMPLOYEES
        if (answer.view === "view all employees") {
            viewEmployees();
        }
        else if(answer.view === "view all department") {
            viewDepartment();
        }
        else if(answer.view === "view all role") {
            viewRole();
        }

        // VIEW EMP ROLE
        else if(answer.view === "view all employees by role") {
            viewEmployeesRole();
        }
        // VIEW EMP MANAGER
        else if(answer.view === "view all employees by Manager") {
            viewEmployeesManager();
        }
        // ADD EMP
        else if(answer.view === "Add employees") {
            Addemployees();
        }
        // REMOVE EMP
        else if(answer.view === "Remove employees") {
            Removeemployees();
        }
        // UPDATE  EMP ROLE
        else if(answer.view === "Update employees role") {
            UpEmployeesRole();
        }
        // UPDATE EMP MANAGER
        else if(answer.view === "Update employees Manager") {
            UpEmployeesManager();
        }
        // BUDGET
        else if(answer.view === "View the total utilized budget of a departmen") {
            viewBudget();
      }  
        else{
          connection.end();
        }
      });
  }

//VIEW ALL EMPLOYEES
function viewEmployees() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
}

//VIEW ALL DEPARTMENT
function viewDepartment() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

//VIEW ROLES
function viewRole() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

// VIEW EMP BY ROLES
function viewEmployeesRole() {
    console.log("Selecting all products...\n");
    connection.query("SELECT role_id, first_name, last_name FROM employee ORDER BY role_id", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
}

//VIEW EMP BY MANAGER
function viewEmployeesManager() {
  console.log("Selecting all products...\n");
  connection.query("SELECT Manager_id, first_name, last_name FROM employee ORDER BY Manager_id", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

//ADD EMP
function Addemployees() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the first name of the employee you want to add?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee you want to add?"
      },
      {
          name: "add_role",
          type: "list",
          message: "Which role of employee do you want to add?",
          choices: 
                  [1,2,3,4,5,6,7,8]
        },
        {
          name: "add_Manager",
          type: "list",
          message: "Who is the manager of the employee you want to add?",
          choices: 
                   [1,2,3,4,5,6,7,8]
         } 
    ])
    .then(function(answer) 
    {
      connection.query
      (
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.add_role,
          manager_id: answer.add_Manager,
        },
        function(err) 
        {
          if (err) throw err;
          console.log("Your auction was created successfully!");
          start();
          
        } 
      );
    });
}


//REMOVE EMP
function Removeemployees() {
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "What is id of the employee you want to delete?"
        }
      ])
      .then(function(answer) 
      {
        connection.query
        (
          "DELETE FROM employee WHERE ?",
          {
            id: answer.id,
          },
          function(err) 
          {
            if (err) throw err;
            console.log("Your auction was deleted successfully!");
            start();
          }
        );
      });
  }

//UPDATE EMP
function UpEmployeesRole() {
  console.log("Selecting all products...\n");
  connection.query("UPDATE employee SET role_id = 1 WHERE role_id= 2", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

//UPDATE EMP MANAGER
function UpEmployeesManager() {
  console.log("Selecting all products...\n");
  connection.query("UPDATE employee SET Manager_id = 3 WHERE Manager_id = 5 ", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

//BUDGET
function viewBudget() {
  console.log("Selecting all products...\n");
  connection.query("SELECT department_id, sum(salary) as total_salary FROM role group BY department_id", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
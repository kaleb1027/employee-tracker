

const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employees_db'
    },

console.log('Connected to the employees_db database')
);

function mainMenu(){
    inquirer
        .prompt({
            name: 'choice',
            type: 'list',
            message: 'Welcome to our employee database! What would you like to do?',
            choices: [
                    'View all employees',
                    'View all departments',
                    'View all roles',
                    'Add an employee',
                    'Add a department',
                    'Add a role',
                    'Update employee role',
                    'EXIT'
                    ]
            }).then(function (answer) {
                switch (answer.choice) {
                    case 'View all employees':
                        viewEmployees();
                        break;
                    case 'View all departments':
                        viewDepartments();
                        break;
                    case 'View all roles':
                        viewRoles();
                        break;
                    case 'Add an employee':
                        addEmployee();
                        break;
                    case 'Add a department':
                        addDepartment();
                        break;
                    case 'Add a role':
                        addRole();
                        break;
                    case 'Update employee role':
                        updateRole();
                        break;
                    case 'EXIT': 
                        exitApp();
                        break;
                    default:
                        break;
                }
        })
};

function viewEmployees(){
    const placehold = `SELECT * FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;`
    db.query(`${placehold}`, function (err, results){
        console.table(results)
        mainMenu();
    })
    
}

function viewDepartments(){
    db.query(`SELECT * FROM department;`, function(err, result){
        console.table(result);
        mainMenu();
    })
    
}

function viewRoles(){
    const placehold = `SELECT role.title, role.salary, department.name
    FROM department
    INNER JOIN role ON role.department_id = department.id;`
    db.query(`${placehold}`, function (err, results){
        console.table(results)
        mainMenu();
    })
    
}


function addEmployee(){
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last",
      },
      {
        type: "input",
        message: "What is the employee's role?",
        name: "role",
      },
      {
        type: "input",
        message: "What is their manager ID (if any)",
        name: "manager",
      },
    ])
    .then(function (answer) {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`,
         [answer.first, answer.last, answer.role, answer.manager],
         function (err){
             if (err) throw err;
             console.table(answer);
             mainMenu();
         })
    })
}


function addDepartment(){
    inquirer
        .prompt({
            name: "name",
            type: "input",
            message: "What Department would you like to add?",
        })
        .then(function(answer){
            db.query(`INSERT INTO department SET ?`, 
            {
                name: answer.name
            },
            function(err){
                if (err) throw err
                console.table(answer)
                mainMenu();
            })
        })
    
}

function addRole(){
    
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "role",
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department ID for the role?",
        name: "dep",
      },
    ])
    .then(function (answer) {
        db.query(`INSERT INTO role (title, salary, department_id)
        VALUES (?,?,?)`,
         [answer.role, answer.salary, answer.dep],
         function (err){
             if (err) throw err;
             console.table(answer);
             mainMenu();
         })
    })
    
}


function updateRole() {
    db.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      const employeeNames = res.map(e => ({
        name: `${e.first_name} ${e.last_name}`, value: e.id
      }))
  
      db.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        var newRole = res.map(r => ({
          name: `${r.title}`, value: r.id
        }))
  
        inquirer
          .prompt([
            {
              type: "list",
              name: "employee",
              message: "Select employee to update.",
              choices: employeeNames
            },
            {
              type: "list",
              name: "role",
              message: "Select the new role.",
              choices: newRole
            }
          ])
          .then(({employee, role}) => {
            db.query("update employee SET role_id = ? WHERE id = ?", [role, employee], function (err, data) {
              if (err) throw err;
              mainMenu();
            } )
          })
      })
    })
  }
  
    
    
    
    



function exitApp(){
    db.end();
}




function init(){
    mainMenu();
}

init();
/*GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
WHEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database */

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
    const placehold = `SELECT * FROM employee
    INNER JOIN role on role.id = employee.role_id
    INNER JOIN department on department.id = role.id;`
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
    mainMenu();
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
    viewRoles();
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
        message: "What department does the role belong to?",
        name: "dep",
      },
    ])
    .then(function (answer) {
        db.query(`INSERT INTO role (title, salary, department_id)
        VALUES`)
    })
    mainMenu();
}


function updateRole(){
    mainMenu();
}


function exitApp(){
    db.end();
}




function init(){
    mainMenu();
}

init();
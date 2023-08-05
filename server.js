const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'company_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the company_db database.');
    mainMenu();
});

const mainMenu = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Exit'
            ]
        }
    ])
    .then((result) => {
        const { choices } = result;

        if (choices === 'View all departments') {
            viewAllDepartments();
            promptUser();
        }

        if (choices === 'View all roles') {
            viewAllRoles();
            promptUser();
        }

        if (choices === 'View all employees') {
            viewAllEmployees();
            promptUser();
        }

        if (choices === 'Add a department') {
            addDepartment();
        }

        if (choices === 'Add a role') {
            addRole();
        }

        if (choices === 'Add an employee') {
            addEmployee();
        }

        if (choices === 'Exit') {
            process.exit();
        }
    });
}

function promptUser() {
    inquirer
        .prompt([
            {
                name: 'continueChoice',
                type: 'list',
                message: 'What would you like to continue?',
                choices: [
                    'Continue',
                    'Exit'
                ]
            }
        ])
        .then((result) => {
            const { continueChoice } = result;
            if (continueChoice === 'Continue') {
                mainMenu();
            }
            if (continueChoice === 'Exit') {
                process.exit();
            }
        });
}
// function for viewing all departments
function viewAllDepartments() {
    db.query('SELECT * FROM department;', (err, results) => {
        if (err) {
            console.error('Error retrieving departments: ', err);
        }
        console.table(results);
    });
}
// function for viewing all roles
function viewAllRoles() {
    db.query('SELECT * FROM role;', (err, results) => {
        if (err) {
            console.error('Error retrieving roles: ', err);
        }
        console.table(results);
    });
}
// function for viewing all employees
function viewAllEmployees() {
    db.query('SELECT * FROM employee;', (err, results) => {
        if (err) {
            console.error('Error retrieving employees: ', err);
        }
        console.table(results);
    });
}
// function for adding departments
function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'departmentName',
                type: 'input',
                message: 'What would you like to name the department?',
            }
        ])
        .then((result) => {
            const { departmentName } = result;
            if (!departmentName) {
                console.log('Please enter a name for the department')
            } else {
                db.query('INSERT INTO department SET ?', 
                { name: departmentName }, 
                (error, results) => {
                    if (error) {
                        console.error('Error inserting department:', error);
                    } else {
                        console.log('Department added successfully');
                        promptUser();
                    }
                });
            }
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: 'titleInput',
                type: 'input',
                message: 'What would you like to name the role?',
            },
            {
                name: 'salaryInput',
                type: 'input',
                message: 'What would you like the salary to be?',
            },
            {
                name: 'role_department_id',
                type: 'input',
                message: 'What is the department ID for the role?',
            }
        ])
        .then((result) => {
            const { titleInput, salaryInput, role_department_id } = result;
            if (!titleInput || !salaryInput || !role_department_id) {
                console.log('Please provide valid input for all fields');
            } else {
                db.query(
                    'INSERT INTO role SET ?',
                    { title: titleInput, salary: salaryInput, department_id: role_department_id },
                    (error, results) => {
                        if (error) {
                            console.error('Error inserting role:', error);
                        } else {
                            console.log('Role added successfully');
                            promptUser();
                        }
                    }
                );
            }
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'employeeFirstName',
                type: 'input',
                message: 'What would you like the first name to be?',
            },
            {
                name: 'employeeLastName',
                type: 'input',
                message: 'What would you like the last name to be?',
            },
            {
                name: 'employee_role_id',
                type: 'input',
                message: 'What is the role ID for the employee?',
            },
            {
                name: 'employee_manager_id',
                type: 'input',
                message: 'What is the manager ID for the employee?',
            }
        ])
        .then((result) => {
            const { employeeFirstName, employeeLastName, employee_role_id, employee_manager_id } = result;
            if (!employeeFirstName || !employeeLastName || !employee_role_id || !employee_manager_id) {
                console.log('Please provide valid input for all fields');
            } else {
                db.query(
                    'INSERT INTO employee SET ?',
                    { first_name: employeeFirstName, last_name: employeeLastName, role_id: employee_role_id, manager_id: employee_manager_id },
                    (error, results) => {
                        if (error) {
                            console.error('Error inserting employee:', error);
                        } else {
                            console.log('Employee added successfully');
                            promptUser();
                        }
                    }
                );
            }
        });
}
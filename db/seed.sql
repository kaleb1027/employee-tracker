USE employees_db;

INSERT INTO department (name)
VALUES
('Finance'),
('Legal'),
('IT'),
('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES
('Accountant', 90000.00, 1),
('Chief Financial Officer', 200000.00, 1),
('Paralegal', 120000.00, 2),
('IT Technician', 170000.00, 3),
('Help Desk Support', 120000.00, 3),
('HR Manager', 90000.00,4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tyler', 'Jones', 1, NULL),
('Bob', 'Thomas', 2, NULL),
('Bill', 'Williams', 3, NULL),
('Johnny', 'Jones', 4, NULL),
('Paul', 'Phillips', 5, NULL),
('Hannah', 'Baker', 6, 1)
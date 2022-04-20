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
('Tyler', 'Jones', 1, 1),
('Bob', 'Thomas', 2, 1),
('Bill', 'Williams', 3, 1),
('Johnny', 'Jones', 4, 1),
('Paul', 'Phillips', 5, 1),
('Hannah', 'Baker', 6, NULL)
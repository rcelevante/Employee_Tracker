
use employee_db;

INSERT INTO department
    (department_name)
VALUES
    ('Cosmetics'),
    ('Fragrances'),
    ('Homes'),
    ('Electronics');

INSERT INTO role
    (title, salary, department_id)
VALUES 
    ('Sales Lead Cosmetics', 45000, 1),
    ('Floor Manager Cosmetics', 40000, 1),
    ('Sales Lead Fragrances', 50000, 2),
    ('Floor Manager Fragrances', 40000, 2),
    ('Sales Lead Homes', 45000, 3),
    ('Floor Manager Homes', 40000, 3),
    ('Sales Lead Electronics', 45000, 4),
    ('Floor Manager Electronics', 40000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);
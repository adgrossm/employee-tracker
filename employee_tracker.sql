DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
department VARCHAR(30) NOT NULL,
PRIMARY KEY (id));

CREATE TABLE role(
id int NOT NULL AUTO_INCREMENT,
PRIMARY KEY (id),
title VARCHAR(30),
salary DECIMAL(10, 2),
department_id INT);

CREATE TABLE employee(
id int NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT NOT NULL,
-- manager_id INT,
PRIMARY KEY (id));


--  add 4 departments no auto_increment ID
INSERT INTO department (id, department)
VALUES (1, 'Sales');

INSERT INTO department (id, department)
VALUES (2, 'Engineering');

INSERT INTO department (id, department)
VALUES (3, 'Legal');

INSERT INTO department (id, department)
VALUES (4, 'HR');

-- add roles
-- added the department_id manually after creating them above

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 35000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Jr. Engineer', 60000, 2 );

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 50000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Legal Lead', 75000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Legal Assistant', 40000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('HR Manager', 55000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('HR Assistant', 37000, 4);

-- add employee
-- manually adding 

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Miller', 'Grossman', 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Brady', 'Grossman', 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Heather', 'Fitzpatrick', 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Tim', 'Campbell', 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('John', 'Lennon', 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Ringo', 'Starr', 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Jerry', 'Garcia', 7);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Clark', 'Kent', 8);

SELECT * FROM employee;
SELECT * FROM role;

-- the join below is from 2 tables employee and role
SELECT first_name, last_name, title
FROM employee
INNER JOIN role ON employee.role_id = role.id;

-- attempting to join 3 tables and show all employees




-- full join method
-- it gives an erro in SQL on line 117 FULL says expecting something
SELECT first_name, last_name, title, salary, department
FROM employee
FULL JOIN 
role ON employee.role_id = role.id
FULL JOIN
department
ON role.department_id = department.id

-- creating view departments




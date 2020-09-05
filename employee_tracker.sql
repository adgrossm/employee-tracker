DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department(
id int NOT NULL AUTO_INCREMENT,
name VARCHAR(30),
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
role_id INT,
manager_id INT,
PRIMARY KEY (id));



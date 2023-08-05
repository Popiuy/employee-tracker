USE company_db;

INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("HR");

INSERT INTO role (department_id, title, salary)
VALUES (1, "Sales Manager", 200000),
       (2, "Engineering Manager", 300000),
       (3, "Finance Manager", 100000),
       (4, "Legal Manager", 80000),
       (5, "HR Manager", 70000),
       (1, "Sales Consultant", 60000),
       (4, "Legal Consultant", 70000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Baum", 1, NULL),
       ("Al", "Fresco", 2, NULL),
       ("Amber", "Green", 3, NULL),
       ("Anne", "Teak", 4, NULL),
       ("Barb", "Dwyer", 5, NULL),
       ("Bill", "Board", 6, 1),
       ("Bob", "Apple", 7, 4);

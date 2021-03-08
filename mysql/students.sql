-- create table
CREATE TABLE students (
	id PRIMARY KEY,
  	first_name VARCHAR(30),
  	middle_name VARCHAR(30),
    last_name VARCHAR(30),
    age INTEGER,
    location VARCHAR(100)
);

-- insert values to table
INSERT INTO students VALUES (1,"Juan",null,"Cruz",18,"Manila");
INSERT INTO students VALUES (2,"John",null,"Young",20,"Manila");
INSERT INTO students VALUES (3,"Victor",null,"Rivera",21,"Manila");
INSERT INTO students VALUES (4,"Adrian",null,"Co",19,"Laguna");
INSERT INTO students VALUES (5,"Pau",null,"Riosa",22,"Marikina");
INSERT INTO students VALUES (6,"Piolo",null,"Pascual",25,"Manila");

--Display database
SELECT * FROM students

-- Update first entry
UPDATE students 
SET 
	first_name = "Anna", 
    middle_name = "Cui", 
    last_name = "Cajocson", 
    age = "25",
    location = "Bulacan"
WHERE id = 1;

-- Delete last entry
DELETE FROM students WHERE id = 6
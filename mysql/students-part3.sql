CREATE TABLE classrooms (
	id integer PRIMARY KEY,
  	student_id integer,
  	section varchar(10)
);
    
    INSERT INTO classrooms VALUES 
        (1,1,"A"),
        (2,2,"A"),
        (3,3,"B"),
        (4,4,"C"),
        (5,5,"B"),
        (6,6,"A"),
        (7,7,"C"),
        (8,8,"B"),
        (9,9,"B"),
        (10,10,"C");

-- INNER JOIN
SELECT * 
FROM students as s
JOIN classrooms as c 
ON s.id = c.student_id;

SELECT * 
FROM students as s
LEFT JOIN classrooms as c 
ON s.id = c.student_id;

SELECT * 
FROM students as s
CROSS JOIN classrooms as c 
ON s.id = c.student_id;
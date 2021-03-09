-- get the total count of students
SELECT COUNT(id) as student_counts FROM students;
-- get all students living in manila
SELECT * FROM students WHERE location="Manila";
-- display average age of all students
SELECT AVG(age) as average_age FROM students;
-- Display all user in descending order by age
SELECT * FROM students ORDER BY age DESC;
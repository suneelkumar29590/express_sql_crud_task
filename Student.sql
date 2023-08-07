CREATE TABLE student (
sid int,
sname varchar(200),
age int,
email varchar(200),
address varchar(200),
mno int,
grade varchar(20)
);

PRAGMA TABLE_info (student);

INSERT INTO student values
(5,
 'kajal',
  25, 
  'kajal@gmail.com',
   'guntur',
    9855652341,
     'A-grade');
-- (2, 'janardhan', 22, 'janardhan@gmail.com', 'kadapa', 5642152414, 'd-grade'),
-- (3, 'uma', 24, 'uma@gmail.com', 'vijayawada', 7854785478, 'c-grade'),
-- (4, 'siva', 23, 'siva@gmail.com', 'kurnool', 85412541254, 'b-grade');

select * from student;

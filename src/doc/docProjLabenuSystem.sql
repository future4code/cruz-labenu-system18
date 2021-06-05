CREATE TABLE class (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL ,
start_date DATE NOT NULL ,
end_date DATE NOT NULL default "1321-12-12",
module INT NOT NULL 
);

CREATE TABLE student (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
birth_date DATE NOT NULL,
class_id INT ,
FOREIGN KEY (class_id) REFERENCES class(id)
);

CREATE TABLE teacher (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
birth_date DATE NOT NULL,
class_id INT ,
FOREIGN KEY (class_id) REFERENCES class(id)
);

CREATE TABLE hobbie (
id INT NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL
);

CREATE TABLE specialty(
id INT NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL
);

CREATE TABLE teacher_specialty(
teacher_id  INT NOT NULL,
specialty_id INT NOT NULL,
PRIMARY KEY (teacher_id,specialty_id),
FOREIGN KEY (teacher_id) REFERENCES teacher(id),
FOREIGN KEY (specialty_id) REFERENCES specialty(id)
);

CREATE TABLE student_hobbie(
student_id INT NOT NULL,
hobbie_id INT NOT NULL,
PRIMARY KEY (student_id,hobbie_id),
FOREIGN KEY (student_id) REFERENCES student(id),
FOREIGN KEY (hobbie_id) REFERENCES hobbie(id)
);

INSERT INTO class  (id,name,start_date,end_date,module) VALUES
(101,"Cruzmaltina","2021-01-25","2021-07-25",5), 
(102,"Topetupo","2021-08-19","2022-02-15",1), 
(103,"Gyarados","2020-11-18","2021-06-06",7), 
(104,"PurpleCats","2022-02-02","2022-09-01",0);

INSERT INTO student (id,name,email,birth_date,class_id) VALUES
(1001,"Anderson Oliveira","tandersonf@email.com","1992-02-02",101),
(1002,"Kakashi Ninja","leafkakashi@anime.com","1919-10-20",103),
(1003,"Naruto Fake","seednalutoo@animez.com","1929-11-12",103),
(1004,"Nersu Capetinga","nersudacapetinga@sertaozin.com","1950-04-07",102);

INSERT INTO teacher (id,name,email,birth_date,class_id) VALUES
(2001,"Obama","Obamacare@usa.com","1939-12-01",101),
(2002,"Vampirao","temervamp@castlevania.com","1900-01-01",102);


INSERT INTO specialty (id,name) VALUES
(51,"React"),(52,"Redux"),(53,"CSS"), 
(54,"Testes"), (55,"Typescript"),
(56,"Programação Orientada a Objetos"), (57,"Backend");

INSERT INTO hobbie(id,name) VALUES 
(21,"Jogar Video game"),(22,"Jogar Bola"),
(23,"Tocar Violão"),(24,"Dormir"),(25,"Fingir de morto");

INSERT INTO student_hobbie  (student_id,hobbie_id) VALUES
(1002,21),(1002,25),(1002,24),
(1001,21),(1004,24),(1003,23),(1003,22);

INSERT INTO teacher_specialty ( teacher_id,specialty_id) VALUES
(2002,51),(2002,54),(2002,53),(2002,56),
(2001,51),(2001,57),(2001,53);





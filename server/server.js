var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'test'
});

connection.connect();
//connection.query("create database test",
connection.query("CREATE TABLE Auditories(	ID                   INTEGER AUTO_INCREMENT,	Name                 VARCHAR(20) NOT NULL AUTO_INCREMENT = 1,1);ALTER TABLE AuditoriesADD PRIMARY KEY (ID);CREATE TABLE Groups(	ID                   INTEGER AUTO_INCREMENT,	Number               INTEGER NOT NULL,	Course               INTEGER NOT NULL,	Speciality           CHAR(250) NOT NULL,	Faculty              VARCHAR(250) NOT NULL AUTO_INCREMENT = 1,1);ALTER TABLE GroupsADD PRIMARY KEY (ID);CREATE TABLE Lessons(	ID                   INTEGER AUTO_INCREMENT,	Begin_time           TIME NOT NULL,	End_time             TIME NOT NULL,	Begin_date           DATE NOT NULL,	End_date             DATE NOT NULL,	Period               INTEGER NOT NULL,	Auditory_ID          INTEGER NULL,	Group_ID             INTEGER NULL,	Teacher_ID           INTEGER NULL AUTO_INCREMENT = 1,1);ALTER TABLE LessonsADD PRIMARY KEY (ID);CREATE TABLE Teachers(	ID                   INTEGER AUTO_INCREMENT,	LastName             VARCHAR(60) NOT NULL,	Name                 VARCHAR(60 VARCHAR(60) NOT NULL AUTO_INCREMENT = 1,1);ALTER TABLE Teachers ADD PRIMARY KEY (ID);ALTER TABLE Lessons ADD FOREIGN KEY R_1 (Auditory_ID) REFERENCES Auditories (ID);ALTER TABLE Lessons ADD FOREIGN KEY R_2 (Group_ID) REFERENCES Groups (ID);ALTER TABLE Lessons ADD FOREIGN KEY R_3 (Teacher_ID) REFERENCES Teachers (ID);",
    function(err, rows, fields) {
    if (err) throw err;

    console.log('ОК');
});

connection.end();
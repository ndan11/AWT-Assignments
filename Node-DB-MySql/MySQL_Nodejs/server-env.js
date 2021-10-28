const mysql = require("mysql");
const express = require("express");
const app = express();
/*connection object using dotenv*/
require("dotenv").config();
const port = 3306;
const host = process.env.HOST;
const user = process.env.USER;
const password = root;
/*Using the object for connection*/
const mysqlConnection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    port: port,
    multipleStatements: true
})
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected to MySQL.");
    }
    else {
        console.log(err);
    }
})
app.listen(8000, () => {
    console.log("Server is listening on local host");
})
/*"localhost:8000/db-create":-Creates a data base named University*/
app.get('/db-create', (req, res) => {
    mysqlConnection.query("CREATE DATABASE University", (err) => {
        if (err) throw err;
        else {
            console.log("Database created successfully!");
        }
    })
})
/*"localhost:8000/db-create-table":-Creates tblStudentInfo and tblFacultyInfo*/
app.get('/db-create-table', (req, res) => {
    const tblStudentInfo = `CREATE TABLE IF NOT EXISTS StudentInfo( 
        studentID varchar(10) NOT NULL, 
        fname varchar(50) NOT NULL, 
        lname varchar(50) NOT NULL, 
        mobileNo varchar(15) NOT NULL, 
        PRIMARY KEY (studentID))`
    const tblFacultyInfo = `CREATE TABLE IF NOT EXISTS FacultyInfo( 
        facultyID varchar(10) NOT NULL, 
        fname varchar(50) NOT NULL, 
        lname varchar(50) NOT NULL, 
        mobileNo varchar(15) NOT NULL, 
        PRIMARY KEY (facultyID))`
    mysqlConnection.query("USE University", (err) => {
        if (err) throw err;
        else {
            mysqlConnection.query(tblStudentInfo, (err) => {
                if (err) throw err;
                else {
                    console.log("Student Table created successfully!")
                }
            });
            mysqlConnection.query(tblFacultyInfo, (err) => {
                if (err) throw err;
                else {
                    console.log("Faculty Table created successfully!")
                }
            });
        }
    });
});
/*"localhost:8000/db-insert":-Inserts data in tblStudentInfo and tblFacultyInfo*/
app.get('/db-insert', (req, res) => {
    const dataStudentInfo = `INSERT INTO StudentInfo(studentID,fname,lname,mobileNo)
    VALUES
    ('019','Nandan','Gadhetharia','2030'),
    ('002','Margiv','Amin','2035'),
    ('088','Vraj','Parikh','2036'),
    ('005','Ved','Bhanushali','2033'),
    ('007','Nikunj','Bhimajiyani','2055')`

    const dataFacultyInfo = `INSERT INTO FacultyInfo( facultyID,fname,lname,MobileNo)
    VALUES
    ('11','Mrugendra','Raghver','8099336611'),
    ('12','Martin','Parmar','8099336612'),
    ('13','Mayuri','Popat','8099336613'),
    ('14','Arpita','Shah','8099336614'),
    ('15','Sneha','Padhiyar','8099336615')`

    mysqlConnection.query("USE University", (err) => {
        if (err) throw err;
        else {
            mysqlConnection.query(dataStudentInfo, (err, result) => {
                if (err) throw err;
                else {
                    console.log(`Total affected rows of Student table: ${result['affectedRows']}`)
                }
            });
            mysqlConnection.query(dataFacultyInfo, (err, result) => {
                if (err) throw err;
                else {
                    console.log(`Total affected rows of Faculty table: ${result['affectedRows']}`)
                }
            });
        }
    });
});
/*"localhost:8000/db-update":-Updates data in tblStudentInfo and tblFacultyInfo*/
app.get('/db-update', (req, res) => {
    const dataStudentInfo = `UPDATE StudentInfo SET studentID = '19CE019' WHERE fname = 'Yagnik'`
    const dataFacultyInfo = `UPDATE FacultyInfo SET facultyID = '101' WHERE fname = 'Mrugendra'`
    mysqlConnection.query("USE University", (err) => {
        if (err) throw err;
        else {
            mysqlConnection.query(dataStudentInfo, (err, result) => {
                if (err) throw err;
                else {
                    console.log(`Total updated rows of Student table: ${result['affectedRows']}`)
                }
            });
            mysqlConnection.query(dataFacultyInfo, (err, result) => {
                if (err) throw err;
                else {
                    console.log(`Total updated rows of Faculty table: ${result['affectedRows']}`)
                }
            });
        }
    });
});
/*"localhost:8000/db-delete":-Updates data in tblStudentInfo and tblFacultyInfo*/
app.get('/db-delete', (req, res) => {
    const dataStudentInfo = `DELETE FROM StudentInfo WHERE studentID = '19CE019'`
    const dataFacultyInfo = `DELETE FROM FacultyInfo WHERE facultyID = '101'`
    mysqlConnection.query("USE University", (err) => {
        if (err) throw err;
        else {
            mysqlConnection.query(dataStudentInfo, (err, result) => {
                if (err) throw err;
                else {
                    console.log(`Total deleted rows of Student table: ${result['affectedRows']}`)
                }
            });
            mysqlConnection.query(dataFacultyInfo, (err, result) => {
                if (err) throw err;
                else {
                    console.log(`Total deleted rows of Faculty table: ${result['affectedRows']}`)
                }
            });
        }
    });
});
app.use( (req,res,next)=>{
    console.log("404ERROR page not found"); 
})
/*Excception Handling*/
process.on("uncaughtException", (err) => {
    console.log("Exception Handled!");
})

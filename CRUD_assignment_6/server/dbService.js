const mysql = require('mysql2');
const dotenv = require('dotenv');
let instance = null;
//dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'root',
    database:'testdb'
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getCourses() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM courses;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertCourse(course) {
        try {
            const dateAdded = new Date();
            await new Promise((resolve, reject) => {
                const query = `INSERT INTO courses (id,name,deptName,instituteName,universityName) 
                    VALUES("${course.id}","${course.name}","${course.deptName}","${course.instituteName}","${course.universityName}");`;

                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve();
                })
            });
            return course;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCourse(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `DELETE FROM courses WHERE id = "${id}"`;
    
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    console.log(err)
                    resolve(result['affectedRows']);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateCourse(course) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = `UPDATE courses 
                    SET name = ${course.name},
                    deptName = ${course.deptName},
                    instituteName = ${course.instituteName},
                    universityName = ${course.universityName}
                    WHERE id = ${course.id}`;
    
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM courses WHERE name like '%${name}%' ;`; // Like opr [%]

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;
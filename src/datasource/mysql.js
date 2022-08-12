const mysql = require("mysql2");
const cnf = require("../config/dbconfig.json");

const conn = mysql.createConnection(cnf);

exports.getAllpersons = function(callback) {
    const sql = "select * from persons";
    conn.query(sql, (err, data) => {
        if(err) {
            console.log(err);
            return;
        }
        callback(data);
    });
}

exports.getPersonByID = function(persid, callback) {
    const sql = "select * from persons where persid = ?";
    conn.query(sql, persid, (err, data) => {
        if(err) {
            console.log(err);
            return;
        }
        callback(data);
    });
}

exports.insertPerson = function(person, callback) {
    const sql = "insert into persons (fullname, email, note, student) values(?,?,?,?)";
    conn.query(sql, [person.fullname, person.email, person.note, person.student], (err, result) => {
        if(err) {
            console.log(err);
            return;
        }
        callback(result);
    })
}

exports.updatePerson = function(persid, person, callback) {
    const sql = "update persons set fullname = ?, email = ?, note = ?, student = ? where persid = ?";
    conn.query(sql, [person.fullname, person.email, person.note, person.student, persid], (err, result) => {
        if(err) {
            console.log(err);
            return;
        }
        callback(result);
    })
}

exports.deletePerson = function(persid, callback) {
    const sql = "DELETE FROM persons WHERE  persid = ?";
    conn.query(sql, persid, (err, result) => {
        if(err) {
            console.log(err);
            return;
        }
        callback(result);
    })
}
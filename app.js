const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("./mysql");
const app = express();
mysql.connect()

var sql = '';
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("server listen");
});

app.get('/', (req, res) => {
    res.send('HI')
})

app.get('/users', (req, res) => {

    let sql = 'SELECT * FROM users'; 

    mysql.query(sql, function (e, r, f) {
        if (e) {
            res.send(JSON.stringify({ "status": 500, "error": true, "response": e }));
        } else {
            res.send(JSON.stringify({ "status": 200, "response": r }));
        }
    })

})

app.get('/users/:id', (req, res) => {

    user = req.params.id
    let sql = 'SELECT * FROM users WHERE id = ' + user; 
    mysql.query(sql, function (e, r, f) {
        if (e) {
            res.send(JSON.stringify({ "status": 500, "error": true, "response": e }));
        } else {
            res.send(JSON.stringify({ "status": 200, "response": r }));
        }
    })

})

app.post('/users/add', (req, res) => {
    
    let data = req.body;
    if (data.name != '' && data.lastname != '') {
        
        // (typeof data.name !== 'undefined' && data.name != '') ? name = escape(data.name) : name = ''

        let sql = 'INSERT INTO users (name,lastname,rut,job)'
            sql+= 'values("'+data.name+'","'+data.lastname+'","'+data.rut+'","'+data.job+'")'

        mysql.query(sql, function (e, r, f) {
            if (e) {
                res.send(JSON.stringify({ "status": 500, "error": true, "response": e }));
            } else {
                res.send(JSON.stringify({ "status": 200, "response": "Saved" }));
            }
        })

    } else {
        res.send(JSON.stringify({ "status": 500, "error": true, "response": "Empty fields!" }));
    }

})

app.post('/users/edit', (req, res) => {

    let data = req.body;

    if (typeof data.id !== 'undefined' && data.id != '') {

        let sql = 'UPDATE users set '
        
        if (typeof data.name !== 'undefined' && data.name != '')
            sql += 'name = "' + data.name + '",'

        if (typeof data.lastname !== 'undefined' && data.lastname != '')
            sql += ' lastname = "' + data.lastname + '",'


        if (typeof data.rut !== 'undefined' && data.rut != '')
            sql += ' rut = "' + data.rut + '",'

        if (typeof data.job !== 'undefined' && data.job != '')
            sql += ' job = "' + data.job + '"'

        sql += ' WHERE id = ' + data.id

        mysql.query(sql, function (e, r, f) {
            if (e) {
                res.send(JSON.stringify({ "status": 500, "error": true, "response": e }));
            } else {
                res.send(JSON.stringify({ "status": 200, "response": "Saved" }));
            }
        })

    } else {
        res.send(JSON.stringify({ "status": 500, "error": true, "response": "Empty fields!" }));
    }

})

// function escape(data){
//     return mysql.escape(data)
// }
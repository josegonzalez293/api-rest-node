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

app.get('/usuarios', (req, res) => {

    let sql = 'SELECT * FROM usuarios'; 

    mysql.query(sql, function (e, r, f) {
        if (e) {
            res.send(JSON.stringify({ "status": 500, "error": true, "response": e }));
        } else {
            res.send(JSON.stringify({ "status": 200, "response": r }));
        }
    })

})

app.get('/usuarios/:id', (req, res) => {

    user = req.params.id
    let sql = 'SELECT * FROM usuarios WHERE id = ' + user; 
    mysql.query(sql, function (e, r, f) {
        if (e) {
            res.send(JSON.stringify({ "status": 500, "error": true, "response": e }));
        } else {
            res.send(JSON.stringify({ "status": 200, "response": r }));
        }
    })

})

app.post('/usuarios/add', (req, res) => {
    
    let data = req.body;
    if (data.nombre != '' && data.apellido != '') {
        
        let sql = 'INSERT INTO usuarios (nombre,apellido,rut,profesion)'
            sql+= 'values("'+data.nombre+'","'+data.apellido+'","'+data.rut+'","'+data.profesion+'")'

        mysql.query(sql, function (e, r, f) {
            if (e) {
                res.send(JSON.stringify({ "status": 500, "error": true, "response": e }));
            } else {
                res.send(JSON.stringify({ "status": 200, "response": "Guardado" }));
            }
        })

    } else {
        res.send(JSON.stringify({ "status": 500, "error": true, "response": "Empty fields!" }));
    }

})

app.post('/usuarios/edit', (req, res) => {

    let data = req.body;

    if (typeof data.id !== 'undefined' && data.id != '') {

        let sql = 'UPDATE usuarios set '
        
        if (typeof data.nombre !== 'undefined' && data.nombre != '')
            sql += 'nombre = "' + data.nombre + '",'

        if (typeof data.apellido !== 'undefined' && data.apellido != '')
            sql += ' apellido = "' + data.apellido + '",'


        if (typeof data.rut !== 'undefined' && data.rut != '')
            sql += ' rut = "' + data.rut + '",'

        if (typeof data.profesion !== 'undefined' && data.profesion != '')
            sql += ' profesion = "' + data.profesion + '"'

        sql += ' WHERE id = ' + data.id

        mysql.query(sql, function (e, r, f) {
            if (e) {
                res.send(JSON.stringify({ "status": 500, "error": true, "response": e }));
            } else {
                res.send(JSON.stringify({ "status": 200, "response": "Guardado" }));
            }
        })

    } else {
        res.send(JSON.stringify({ "status": 500, "error": true, "response": "Empty fields!" }));
    }

})
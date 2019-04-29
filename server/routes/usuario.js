const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../models/usuario.js');

app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        edad: body.edad,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save( (err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: err
            })
        }

        res.json({
            ok: true,
            usuario : usuarioDB
        })

    })
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({'put Usuario': id});
});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

module.exports = app;
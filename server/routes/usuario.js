const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/usuario.js');
const { verificarToken, verificarRole } = require('../middlewares/autenticacion')

app.get('/usuario', verificarToken, (req, res) => {

    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;

    Usuario.find({ estado: true }, 'nombre email role estado img google').skip(desde).limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }

            Usuario.countDocuments({ estado: true }, (err, count) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: err
                    });
                }
                res.json({
                    ok: true,
                    count,
                    usuarios
                });
            });
        });
});

app.post('/usuario', [verificarToken, verificarRole], (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        edad: body.edad,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.put('/usuario/:id', [verificarToken, verificarRole], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'apellido', 'edad', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }


        res.json({
            ok: true,
            usaurio: usuarioDB
        });
    });
});

app.delete('/usuario/:id', [verificarToken, verificarRole], (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.json({
            ok: true,
            usaurio: usuarioBorrado
        });

    });
});


// Borrado fisico de un Usuario
/*app.delete('/usuario/:id', verificarToken, (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario no Encontrado'
            });
        }

        res.json({
            ok: true,
            usaurio: usuarioBorrado
        });

    });
});*/

module.exports = app;
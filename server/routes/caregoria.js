const express = require('express');
const { verificarToken, verificarRole } = require('../middlewares/autenticacion');
const app = express();

let Categoria = require('../models/categoria');
let Usuario = require('../models/usuario');

// ==================================
// Mostrar todas las categorias
// ==================================
app.get('/categoria', verificarToken, (req, res) => {

    Categoria.find().exec((err, categorias) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        Categoria.countDocuments( (err, count) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                });
            }
            res.json({
                ok: true,
                count,
                categorias
            });
        });
    });
});

// ==================================
// Mostrar una categoria por ID
// ==================================
app.get('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    }));
});

// ==================================
// Crear nueva categoria
// ==================================
app.post('/categoria', verificarToken, (req, res) => {
    let body = req.body;

    let newCategoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario
    }) ;

    newCategoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});

// ==================================
// Actualizar una Categoria
// ==================================
app.put('/categoria/:id', verificarToken, (req, res) => {

    let descripcion = body.descripcion;

    Categoria.findByIdAndUpdate(id, {descripcion: descripcion}, { new: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }


        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

// ==================================
// Borrar fisicamente Solo ADMIN_ROLE
// ==================================
app.get('/categoria', [verificarToken, verificarRole], (req, res) => {
    let id = req.params.id;
    
    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Categoria no Encontrada'
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBorrada
        });
    });
});

module.exports = app;
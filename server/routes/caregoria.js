const express = require('express');
const { verificarToken } = require('../middlewares/autenticacion');
const app = express();

let Categoria = require('../models/categoria');

// ==================================
// Mostrar todas las categorias
// ==================================
app.get('/categoria', (req, res) => {

});

// ==================================
// Mostrar una categoria por ID
// ==================================
app.get('/categoria/:id', (req, res) => {

});

// ==================================
// Crear nueva categoria
// ==================================
app.post('/categoria', (req, res) => {

});

// ==================================
// Actualizar una Categoria
// ==================================
app.put('/categoria/:id', (req, res) => {

});

// ==================================
// Borrar fisicamente Solo ADMIN_ROLE
// ==================================
app.get('/categoria', (req, res) => {

});


module.exports = app;
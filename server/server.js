require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parseador application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//parse aplicatio/json
app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {
    let body = req.body;
    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: "el nombre es necesario"
        })
    }else{
        res.json({nuevoUser: body});
    }
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({'put Usuario': id});
});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

app.listen(process.env.PORT, () => console.log('Escuchando el puerto: ', process.env.PORT));
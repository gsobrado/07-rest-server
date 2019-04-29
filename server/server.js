require('./config/config.js');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// parseador application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//parse aplicatio/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

mongoose.connect('mongodb://localhost:27017/cafe', {useNewUrlParser: true}, (err) =>  {
    if(err) throw new Error('Error', err);
    console.log('Base de daton ONLINE');
});

app.listen(process.env.PORT, () => console.log('Escuchando el puerto: ', process.env.PORT));
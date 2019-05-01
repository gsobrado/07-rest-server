const mongoose = require('mongoose');
const uniqueValidarot = require('mongoose-unique-validator');

let rolesValues= {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es nesesario']
    },
    apellido: {
        type: String
    },
    edad: {
        type: Number
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es nesasario']
    },
    password: {
        type : String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValues
    },
    estado: {
        type: Boolean,
        default : true
    },
    google: {
        type: Boolean,
        default : false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userobject = user.toObject();
    delete userobject.password;

    return userobject;
}

usuarioSchema.plugin(uniqueValidarot, {message: '{PATH} debe de ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles : [{
        type: Schema.Types.ObjectId,
        ref: 'Rol'
    }]
});


module.exports = model('Usuario', UsuarioSchema );


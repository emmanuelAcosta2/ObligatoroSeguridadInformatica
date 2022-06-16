const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true
    }
});


module.exports = model('Rol', RolSchema );


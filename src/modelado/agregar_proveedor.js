//vamos a crear schema de pedidos
const mongoose = require('mongoose');

const {Schema} = mongoose;
const UserSchema = new Schema({
    id_proveedor: {type: String, required: true},
    nombre: {type: String, required: true},
    telefono: {type: Number, required: true},
    correo: {type: String, required: true},
});

module.exports = mongoose.model('proveedores', UserSchema);
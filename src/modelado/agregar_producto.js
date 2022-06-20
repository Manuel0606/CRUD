//vamos a crear schema de pedidos
const mongoose = require('mongoose');

const {Schema} = mongoose;
const UserSchema = new Schema({
    id_producto: {type: String, required: true},
    id_proveedor: {type: String, required: true},
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
});

module.exports = mongoose.model('productos', UserSchema);
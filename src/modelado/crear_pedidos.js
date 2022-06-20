//vamos a crear schema de pedidos
const mongoose = require('mongoose');

const {Schema} = mongoose;
const UserSchema = new Schema({
    id_pedido: {type: String, required: true},
    comprador: {type: String, required: true},
    valor: {type: Number, required: true},
    articulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('pedidos', UserSchema);
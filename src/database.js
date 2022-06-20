// se incluye el modulo mongoose
const mongoose = require ('mongoose');
// Se crea la base de datos llamada miEmpresa2
mongoose.connect('mongodb://localhost/miEmpresa2', {
    // Activa las advertencias de mongo
    useUnifiedTopology: true,
    // useCreateIndex: true,
    useNewUrlParser: true,
    // useFindAndModify: true
})
// se incluye el modulo express
const{Router} = require("express");
// se incluye el modulo express
const express = require('express');

// Para crear manejadores de rutas
const archivo = express.Router();

// se incluye una ruta registro a la constante User
const User = require('../modelado/registro');

/// se incluye una ruta crear_pedidos a la constante orden
const orden = require('../modelado/crear_pedidos');

const producto = require('../modelado/agregar_producto');

const proveedor = require('../modelado/agregar_proveedor');


// se incluye el modulo passport
// Facilitar crear login de forma mas amigable
const passport = require('passport');

// se incluye el modulo bcrypt
const bcrypt = require('bcrypt');


// se define las rutas en el archivo inicio
archivo.get('/', (req, res, next)=>{
    res.render('inicio');
})

// aqui vamos a implementar el inicio de sesion
archivo.get('/inicioSesion', (req, res, next)=>{
    res.render('inicioSesion')
})


//(req, res) = req(solicitud) res(responde)
archivo.get('/formulario', (req, res, next) => {
    res.render('formulario');
    //res.send('formulario')
});

archivo.post('/formulario', async(req, res) => {
    const {email, password, date} = req.body;

    //aquí vamos a validar que el email no exista
    // Devuelve el primer documento con la caracteristica que se le indica
    const E = await User.findOne({email});
    if(E) {
        res.send('el email ya existe');
    } else {
        const nuevoU = new User({email, password, date});
        await nuevoU.save();
        res.send('el documento se guardo satisfactoriamente');
    }
});

// implementamos el post del inicio de sesion
archivo.post('/inicioSesion', async(req, res) =>{
    //cuando el usuario ingrese al sistema debe digitar la clave normal
    const {email, password, date} = req.body;
    // Devuelve el primer documento con la caracteristica que se le indica
    const user = await User.findOne({email});
    if(user){
        //vamos a verificar el paswword se digita en el formulario
        var clavex = req.body.password;
        //p => la clave encriptada, esta en la BD
        var p = user.password;
        bcrypt.compare(clavex, p, function(error, isMatch){
            if(error){
                throw error //Decisión
            }else if(!isMatch){
                res.send("La contraseña no es correcta")
            }else{
                res.render('home')
            }
        })
    }else{
        res.render('formulario');
    }
});

archivo.get('/crear_pedidos', (req, res, next) => {
    res.render('crear_pedidos');
    // res.send('formulario');
});

archivo.post('/crear_pedidos', async(req, res) =>{
    const {id_pedido, comprador, valor, articulo, descripcion, date} = req.body;

    // Devuelve el primer documento con la caracteristica que se le indica
    const p = await orden.findOne({id_pedido});

    if (p) {
        res.send('el pedido ya existe');
    } else{
        const nuevoP = new orden({id_pedido, comprador, valor, articulo, descripcion, date});
        await nuevoP.save();
        res.send('el pedido se guardo satisfactoriamente');
    }
});

// get => consultar pedidos
archivo.get('/Consultar_p', (req, res, next) => {
    res.render('Consultar_p');
});

// Consultar pedidos
archivo.post('/Consultar_p', async(req, res) => {
    const{id_pedido}=req.body;
    //aqui vamos a validar que el  pedido exista 
    const Cp = await orden.findOne({id_pedido});
    if(Cp){
        const datos= [Cp.id_pedido,Cp.comprador,Cp.valor,Cp.articulo,Cp.descripcion,Cp.date]
        res.render('mostrar_p',{datos})
        
    }
    else{
        res.send('El pedido  no existe')
    }
});

archivo.get('/agregar_producto', (req, res, next) => {
    res.render('agregar_producto');
    // res.send('formulario');
});

archivo.post('/agregar_producto', async(req, res) =>{
    const {id_producto, id_proveedor, nombre, precio, stock} = req.body;

    // Devuelve el primer documento con la caracteristica que se le indica
    const p = await producto.findOne({id_producto});

    if (p) {
        res.send('el producto ya existe');
    } else{
        const nuevoP = new producto({id_producto, id_proveedor, nombre, precio, stock});
        await nuevoP.save();
        res.send('el producto se guardo satisfactoriamente');
    }
});


archivo.get('/agregar_proveedor', (req, res, next) => {
    res.render('agregar_proveedor');
    // res.send('formulario');
});

archivo.post('/agregar_proveedor', async(req, res) =>{
    const {id_proveedor, nombre, telefono, correo} = req.body;

    // Devuelve el primer documento con la caracteristica que se le indica
    const p = await proveedor.findOne({id_proveedor});

    if (p) {
        res.send('el proveedor ya existe');
    } else{
        const nuevoP = new proveedor({id_proveedor, nombre, telefono, correo});
        await nuevoP.save();
        res.send('el proveedor se guardo satisfactoriamente');
    }
});

archivo.get('/consultar_producto', (req, res, next) => {
    res.render('consultar_producto');
});

// Consultar pedidos
archivo.post('/consultar_producto', async(req, res) => {
    const{id_producto} = req.body;
    //aqui vamos a validar que el  pedido exista 
    const Cp = await producto.findOne({id_producto});
    if(Cp){
        //const datos= [Cp.id_producto, Cp.id_proveedor, Cp.nombre, Cp.precio, Cp.stock];
        var id_proveedor = Cp.id_proveedor; //datos[2];
        const CpP = await proveedor.findOne({id_proveedor});

        const datos = [Cp.id_producto, CpP.nombre, Cp.nombre, Cp.precio, Cp.stock];

        res.render('mostrar_producto',{datos}); 
    }
    else{
        res.send('El pedido  no existe')
    }
});

//get => CRUD => U => Update
archivo.get('/update_p', (req, res, next) => {
    res.render('update_p');
});

//id_producto, id_proveedor, nombre, precio, stock
archivo.post('/update_p', async(req, res) => {
    const {id_producto, precio, stock} = req.body;
    const update_p = await producto.findOne({id_producto});
    if(update_p){
        //let instanciar variable
        let body = req.body;
        producto.updateOne({id_producto}, {
            $set:{
                precio: body.precio,
                stock : body.stock
            }
        },
        function(error, info) {
            if(error){
                const msg = "No se pudo realizar la actualización";
                res.render('update_p',{msg}); 
                // res.json({
                //     resultado: false,
                //     msg: "No se pudo realizar la actualización",
                //     err
                // });
            } else{
                const msg = "Se realizó la actualización";
                res.render('update_p',{msg}); 
                // res.json({
                //     resultado: true,
                //     info: info
                // });
            }
        }
        );
    } else {
        const msg = "El pedido no existe";
        res.render('update_p',{msg});
        // res.send(" El pedido no existe");
    }
});

archivo.get('/delete_doc_p', (req, res, next) => {
    res.render('delete_doc_p');
});

// Eliminar documentos
archivo.post('/delete_doc_p', async(req, res) => {
    const {id_producto} = req.body;

    // aquí vamos a validar que el pedido exista
    const delete_p = await producto.findOne({id_producto});
    
    if (delete_p) {
        producto.deleteOne({id_producto}, function(err, obj){
            if(err) throw err;
            const msg = "El producto fue borrado";
            res.render('delete_doc_p',{msg});
        });    
    } else {
        const msg = "El producto no existe";
        res.render('delete_doc_p',{msg});
    }
});

// se exporta archivo a traves de modulo 
module.exports = archivo;
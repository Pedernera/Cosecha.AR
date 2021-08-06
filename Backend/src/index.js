    const express = require('express');
    const cors = require('cors')
    const session = require('express-session')
    const fileupload = require('express-fileupload')
    
    const usuariosRutas = require('./Rutas/UsuariosRutas');
    const servicioRutas = require('./Rutas/ServiciosRutas');
    const autenticacion = require('./Rutas/Autenticacion');
    const publicaciones = require('./Rutas/Publicaciones');
    const categorias    = require('./Rutas/Categoria');
    const prestador     = require('./Rutas/Prestador');
    const productor     = require('./Rutas/Productor');
    const comentario    = require('./Rutas/Comentarios');
    const app = express();
    
    app.use(cors({credentials:true, origin :'http://localhost:3000'}))
    app.use(fileupload())
    app.use(session({
        secret:'12345',
        resave: false, 
        saveUninitialized:true, 
    }))
    app.use( express.static('public'))
    app.use(express.json());
    
    app.use('/usuarios',usuariosRutas);
    app.use('/servicio',servicioRutas);
    app.use('/autenticacion',autenticacion);
    app.use('/publicaciones',publicaciones);
    app.use('/categorias',categorias);
    app.use('/prestadores',prestador);
    app.use('/productores',productor);
    app.use('/comentario',comentario)
    app.listen(8000,()=>{
        console.log('Servidor Funcionando...')
    })
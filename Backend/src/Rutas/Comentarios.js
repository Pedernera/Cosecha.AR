const express = require('express')
const router = express()
const conexion = require('../conexion')

router.get('/',(req,res)=>{
    const sql ='SELECT * FROM comentarios';

conexion.query(sql,(error,result)=>{
    if(error){
        res.send('error al traer comentarios')
    }else{
        res.json(result)
    }
})

})

router.get('/publicacion/:idPublicacion',(req,res)=>{
    const idPublicacion = req.params.idPublicacion
    const sql = 'SELECT * FROM comentarios WHERE idPublicacion=?' 
    
    conexion.query(sql, [idPublicacion] ,(err, result)=>{
        if(err){

            res.send('Error al traer comentarios')
        }else{
            res.json(result)
        }
    })
 })

router.get('/:id',(req,res)=>{
    const id = req.params.id
    const sql = 'SELECT * FROM comentarios WHERE id= ?' 
    
    conexion.query(sql, [id] ,(err, result)=>{
        if(err){

            res.send('Error al traer comentarios')
        }else{
            res.json(result[0])
        }
    })
 })

 
 router.post('/:idPublicacion',(req,res)=>{
    const sql=`INSERT INTO comentarios (idPublicacion,nombreUser,texto) 
              VALUES(?,?,?)`
    const idPublicacion = req.params.idPublicacion
    const comentario = req.body.comentario
    const nombreUser = req.body.name
    conexion.query(sql, [idPublicacion,nombreUser,comentario], (err,result)=>{
        if(err){
            res.status(401).json({message:'Error al insertar comentario'})
        }else{
            res.status(200).json({message:'Comentario Publicado exitosamente'})
        }
    })
})
 module.exports=router
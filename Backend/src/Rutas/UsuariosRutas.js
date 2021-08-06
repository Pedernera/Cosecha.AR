 const express = require('express');
 const conexion = require('../conexion')
 const path = require('path');
 const fs = require('fs');
 const router = express.Router();

 router.get('/',(req,res)=>{
        const sql ='SELECT * FROM usuarios';

        conexion.query(sql,(error,result)=>{
            if(error){
                res.send('error usuarios')
            }else{
                res.json(result)
            }
        })
 })
 router.get('/email/:email',(req,res)=>{
    const email = req.params.email
    const sql ='SELECT * FROM usuarios WHERE email=?';
    conexion.query(sql,[email],(error,result)=>{
        if(error){
            res.send('error usuario')
        }else{
            res.json(result)
        }
    })
})
 router.get('/:id',(req,res)=>{
    const idUsuario = req.params.id
    const sql = 'SELECT * FROM usuarios WHERE id= ?' 
    
    conexion.query(sql, [idUsuario] ,(err, result)=>{
        if(err){
            res.send('Error usuario')
        }else{
            res.json(result)
        }
    })
})

router.post('/',(req,res)=>{
    const sql=`INSERT INTO usuarios (nombre, apellido , email, password) 
               VALUES(?,?,?,?)`

    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const email = req.body.email
    const password= req.body.password
    
    conexion.query(sql, [nombre,apellido,email,password], (err,result)=>{
        if(err){
            console.log(err)
            res.status(401).json({message:'Error al crear cuenta'})
        }else{
            const nombreCompleto=`${nombre} ${apellido}`
            res.status(200).json({message:'Bienvenido',data:nombreCompleto})           
        }
    })
})

router.put('/:id',(req,res)=>{

    let sql=`UPDATE usuarios 
                SET nombre =?,
                    apellido=?,
                    email=?,
                    password=?
                    `;

    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const email = req.body.email
    const password= req.body.password
    let values= [nombre, apellido, email,password]
    if(req.files){
        const sqlCurrentImage = `SELECT img
                                FROM usuarios
                                WHERE id=?`;
        conexion.query(sqlCurrentImage,[req.params.id],(err,result)=>{
            if(err){
                console.log(err);
            }
            if(result[0].img !== 'sinfoto.jpg'){
                //Borrar imagen actual
                const fileToDelete = `./public/images/${result[0].img}`;
                fs.unlink(fileToDelete,(err)=>{
                    if(err){
                        
                        console.log('error al borrar archivo')
                    }else{
                        console.log('archivo borrado')
                    }
                })
            }else{
                console.log('imagen no borrada ' + result[0].img )
            }
        })
        
        const imgPub = req.files.imgPub
        imageFileName = Date.now() + path.extname(imgPub.name)
        imgPub.mv(`./public/images/${imageFileName}`,(err)=>{
            if(err){
                console.log(err)
            }
        })
        sql += `, img=?`;
        values.push(imageFileName)
    } 
        sql += `WHERE id=?`
        values.push(req.params.id)
    
    conexion.query(sql,values, (err,result)=>{
        if(err){
            res.send('Error modificando usuario')
        }else{
            res.send('Usuario modificado')
        }
    })
})

router.delete('/:id',(req,res)=>{
    const sql = `DELETE 
                 FROM usuarios
                 WHERE id=?`;
    const id = req.params.id
    conexion.query(sql, [id], (err,result)=>{
        if(err){
            console.log(result)
            res.send('Error al eliminar usuario')
        }else{
            res.send('Usuario Eliminado')
        }
    })
})

 module.exports=router
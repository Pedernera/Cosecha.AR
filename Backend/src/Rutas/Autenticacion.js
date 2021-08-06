const express = require('express')
const router = express()
const conexion = require('../conexion')

router.get('/check',(req,res)=>{
    if(req.session.user){
        res.json({message:'ok', data: req.session.user})
    }else{
        res.json({message:'error'})
    }
})
//Iniciar Sesion
router.post('/',(req,res)=>{
    const sql =`SELECT * 
                FROM usuarios
                WHERE email =?
                AND password=?`
conexion.query(sql,[req.body.email,req.body.password],(err,result)=>{
    if(err){
        console.log('Error Verificacion')
    }else{
        if(result.length === 1){
            const nombreCompleto=`${result[0].nombre} ${result[0].apellido}`

            req.session.user={
                name: nombreCompleto, 
                id: result[0].id,
            }
        
            res.status(200).json({id:req.session.user.id,data:nombreCompleto})
        }else{
            res.status(401).json({message:'usuario invalido'})
        }
    }
})
    
})

//Cerrar Sesion

router.delete('/',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.status(500).json({message:'Error'})
        }else{
            res.json({message:'Sesion cerrada'})
        }
    })
})

//Registro
router.post('/registro',(req,res)=>{
    const sql =`SELECT * 
                FROM usuarios
                WHERE email =?
                AND password=?`
conexion.query(sql,[req.body.email,req.body.password],(err,result)=>{
    if(err){
        console.log('Error Verificacion')
    }else{
        if(result.length === 1){
            const nombreCompleto=`${result[0].nombre} ${result[0].apellido}`

            req.session.user={
                name: nombreCompleto, 
                id: result[0].id,
            }
        
            res.status(200).json({id:req.session.user.id,data:nombreCompleto})
        }
    }
})
    
})
module.exports = router 
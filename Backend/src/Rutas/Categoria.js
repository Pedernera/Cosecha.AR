const express = require('express');
const conexion = require('../conexion')

const router = express.Router();

router.get('/',(req,res)=>{
           const sql ='SELECT * FROM categoria';

       conexion.query(sql,(error,result)=>{
           if(error){
               res.send('error categoria')
           }else{
               res.json(result)
           }
       })
      
})

router.get('/:id',(req,res)=>{
    const idCategoria = req.params.id
    const sql = 'SELECT * FROM categoria WHERE id= ?' 
    
    conexion.query(sql, [idCategoria] ,(err, result)=>{
        if(err){
            res.send('Error categoria')
        }else{
            res.json(result[0])
        }
    })
 })

 module.exports=router
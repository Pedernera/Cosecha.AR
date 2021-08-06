const express = require('express');
const conexion = require('../conexion')

const router = express.Router();

router.get('/',(req,res)=>{
           const sql ='SELECT * FROM servicio';
       conexion.query(sql,(error,result)=>{
           if(error){
               res.send('error servicio')
           }else{
               res.json(result)
           }
       })
      
})

router.get('/:id',(req,res)=>{
   const idServicio = req.params.id
   const sql = 'SELECT * FROM servicio WHERE id= ?' 
   
   conexion.query(sql, [idServicio] ,(err, result)=>{
       if(err){
           res.send('Error servicio')
       }else{
           res.json(result[0])
       }
   })
})



module.exports=router
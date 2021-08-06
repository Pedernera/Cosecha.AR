const express = require('express');
const conexion = require('../conexion');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/',(req,res)=>{
           const sql ='SELECT * FROM servicioprestado';

       conexion.query(sql,(error,result)=>{
           if(error){
               res.send('error servicio')
           }else{
               res.json(result)
           }
       })
      
})

router.get('/userpubs/:id',(req,res)=>{
    const idPrestador = req.params.id
    const sql ='SELECT * FROM servicioprestado WHERE idPrestador=?';

    conexion.query(sql,[idPrestador],(error,result)=>{
        if(error){
            res.send('error servicio')
        }else{
            res.json(result)
        }
    })
})

router.get('/:id',(req,res)=>{
    const idServicio = req.params.id
    const sql = 'SELECT * FROM servicioprestado WHERE id= ?' 
    conexion.query(sql, [idServicio] ,(err, result)=>{
        if(err){
            res.send('Error servicio')
        }else{
            res.json(result[0])
        }
    })
 })
   
 router.post('/',(req,res)=>{
    let imageFileName = '';

   if(req.files){
        const imgPub = req.files.imgPub;
        imageFileName= Date.now() + path.extname(imgPub.name);
        
        imgPub.mv( `./public/images/${imageFileName}`,(err)=>{
              if(err){  console.log(err)}
        })

    }
    let sql = `INSERT INTO servicioprestado(idPrestador, idServicio, precio, img)
               VALUES (?,?,?,?)`
    const values =[
        req.body.idPrestador,
        req.body.servicioPub,
        req.body.precioPub,
        imageFileName
    ] 
    conexion.query(sql,values,(err,result)=>{
        if(err){
            res.json({
                status:'error',
                message:'publicacion no subida',
            })
            console.log(err)
        }else{
            res.json({
                status:'ok',
                message:'publicacion subida',
            })
        }
    })

})

router.put('/:id',(req,res)=>{
  let sql =`UPDATE servicioprestado
            SET idServicio =?,
                precio =?`
    
    let values = [req.body.servicioPub, req.body.precioPub]

    if(req.files){
        //Averiguo nombre img actual
        const sqlCurrentImage = `SELECT img
                                FROM servicioprestado
                                WHERE id=?`;
        conexion.query(sqlCurrentImage,[req.params.id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                //Borrar imagen actual
                const fileToDelete = `./public/images/${result[0].img}`;
                fs.unlink(fileToDelete,(err)=>{
                    if(err){
                        
                        console.log('error al borrar archivo')
                    }else{
                        console.log('archivo borrado')
                    }
                })
            }
        })
        //obtener nueva imagen
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
    
    conexion.query(sql,values,(err,result)=>{
        if(err){
            
            res.json({
                status:'error',
                message:'error al modificar publicacion',
            })
        }else{
            res.json({
                status:'ok',
                message:'publicacion modificada correctamente',
            })
        }
    })
})

router.delete('/:id',(req,res)=>{
    const sql = `DELETE 
                 FROM servicioprestado
                 WHERE id=?`;
    const id = req.params.id
    conexion.query(sql, [id], (err,result)=>{
        if(err){
            console.log(err)
            res.json({
                status:'error',
                message:'error al eliminar publicacion',
            })
        }else{
            console.log('eliminado')
            res.json({
                status:'ok',
                message:'publicacion eliminada',
            })
        }
    })
})

 module.exports=router
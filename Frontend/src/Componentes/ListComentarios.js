import React,{useEffect,useState} from 'react'
import CardComentarios from './CardComentarios'
export default function ListComentarios(props) {
    const [comentarios,setComentarios]= useState([]);
    useEffect(getComentarios,[props.cargar]);
    async function getComentarios(){
        const url='http://localhost:8000/comentario/publicacion/'+ props.id;
        const response = await fetch(url,{credentials:'include'});
        const data = await response.json();
        setComentarios(data)
    }

    function getCards(){
        props.setCargar(false)
        const cards = comentarios.map( (comentario)=>{
          
          return(
            <CardComentarios  
                nombreUser={comentario.nombreUser} 
                texto={comentario.texto}
                fechaComentario={comentario.fechaComentario}  
              />
          )
          
        })
        return cards;
      }

    return (
        <>
            {getCards()}
        </>
    )
}

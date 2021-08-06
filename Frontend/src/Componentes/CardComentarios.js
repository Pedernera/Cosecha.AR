import React from 'react'
import Card from 'react-bootstrap/Card'
export default function CardComentarios(props) {
  
    return (
        <>
            <Card>
              <Card.Header>{props.nombreUser}</Card.Header>
              <Card.Body>
                <Card.Text>
                    {props.texto}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">{props.fechaComentario}</Card.Footer>
            </Card>
        </>
    )
}

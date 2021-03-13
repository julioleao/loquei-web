import React from 'react';
import { Card, CardDeck, Col, Container, Row } from 'react-bootstrap';

import house from '../../assets/house.jpg';

const Cards = (props) => {
  const { title, pic, description, updateAt } = props.card;
  //console.log(props);
  return (
    <Card style={{ width: '18rem', margin: '20px' }}>
      <Card.Img variant='top' src={pic} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>Atualizado: {updateAt}</small>
      </Card.Footer>
    </Card>
  );
};

export default Cards;

import React from 'react';
import {
  Card,
  CardDeck,
  Col,
  Container,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { FaBed, FaBath, FaCar } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

import house from '../../assets/house.jpg';
import './styles.css';

const Cards = (props) => {
  const {
    _id,
    title,
    pictures,
    description,
    updateAt,
    bedroom,
    bathroom,
    garage,
    price,
    iptu,
    condo,
    address,
  } = props.card;
  const { cep, city, neightborhood, state, street } = address;

  const history = useHistory();

  const routeChange = () => {
    let path = `/detail/${_id}`;
    history.push(path);
  };
  return (
    <div id='cards'>
      <Card style={{ width: '18rem', margin: '20px' }} onClick={routeChange}>
        <Card.Header className='text-center'>R$ {price}</Card.Header>
        <Card.Img variant='top' src={pictures[0]} style={{ height: '170px' }} />
        <Card.Header
          style={{ justifyContent: 'space-between', display: 'flex' }}
        >
          <FaBed />
          <small>{bedroom}</small>
          <FaBath />
          <small>{bathroom}</small>
          <FaCar />
          <small>{garage}</small>
        </Card.Header>

        <Col style={{ alignItems: 'center' }}>
          <Row>
            <small>
              {street}, {neightborhood}
            </small>
          </Row>
          <Row>
            <small>
              {city} - {state}
            </small>
          </Row>
        </Col>

        <Card.Footer
          style={{ justifyContent: 'space-between', display: 'flex' }}
        >
          <small className='text-muted'>Atualizado: {updateAt}</small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Cards;

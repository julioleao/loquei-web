import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaBed, FaBath, FaCar } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import './styles.css';

const Cards = (props) => {
  const {
    _id,
    updatedAt,
    thumbnail,
    bedroom,
    bathroom,
    garage,
    price,
    address,
  } = props.card;
  const { city, neightborhood, state, street } = address;

  const date = moment(updatedAt).format('LL');

  const history = useHistory();

  const RouteChange = () => {
    let path = `/detail/${_id}`;
    history.push(path);
  };

  return (
    <div id='cards'>
      <Card onClick={RouteChange}>
        <Card.Header className='text-center'>R$ {price}</Card.Header>
        <Card.Img variant='top' src={thumbnail} style={{ height: '170px' }} />
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
          <small className='text-muted'>Atualizado: {date}</small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Cards;

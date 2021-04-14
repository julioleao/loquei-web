import React from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { FaBed, FaBath, FaCar, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import './styles.css';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import ShowModal from '../modal';

const Cards = (props) => {
  const [show, setShow] = useState(false);
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
  const { edit } = props;
  const { city, neightborhood, state, street } = address;

  const handleClose = () => setShow(false);
  const modalShow = () => setShow(true);

  const date = moment(updatedAt).format('LL');

  const history = useHistory();

  const RouteChange = () => {
    let path = `/detail/${_id}`;
    history.push(path);
  };

  return (
    <div>
      {!edit ? (
        <div id='cards'>
          <Card onClick={RouteChange}>
            <Card.Header className='text-center'>R$ {price}</Card.Header>
            <Card.Img
              variant='top'
              src={thumbnail}
              style={{ height: '170px' }}
            />

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
      ) : (
        <div id='cards'>
          <Card>
            <Card.Header className='text-center'>R$ {price}</Card.Header>
            <Card.Img
              variant='top'
              src={thumbnail}
              style={{ height: '170px' }}
              onClick={RouteChange}
            />

            <Row>
              <Col id='edit-button' onClick={() => console.log('Editou')}>
                <FiEdit />
              </Col>
              <Col id='delete-button' onClick={() => setShow(true)}>
                <FiTrash2 />
              </Col>
            </Row>

            <Card.Footer
              style={{ justifyContent: 'space-between', display: 'flex' }}
            >
              <small className='text-muted'>Atualizado: {date}</small>
            </Card.Footer>
          </Card>
          <ShowModal show={show} onHide={() => setShow(false)} />
        </div>
      )}
    </div>
  );
};

export default Cards;

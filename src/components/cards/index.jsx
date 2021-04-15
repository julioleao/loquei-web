import React from 'react';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import { FaBed, FaBath, FaCar } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import moment from 'moment';

import ShowModal from '../modal';
import NewForm from '../form';
import './styles.css';

const Cards = (props) => {
  const [show, setShow] = useState(false);
  const [editForm, setEditForm] = useState(false);
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

  const date = moment(updatedAt).format('LL');

  const history = useHistory();

  const RouteChange = () => {
    let path = `/detail/${_id}`;
    history.push(path);
  };

  if (!props.card || props.card === 'undefined' || address === 'undefined') {
    return;
  }

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
              <Col id='edit-button' onClick={() => setEditForm(true)}>
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
          <ShowModal show={show} onHide={() => setShow(false)} postId={_id} />
          <Modal
            show={editForm}
            onHide={() => setEditForm(false)}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            id='modal_edit'
          >
            <Modal.Header id='modal-header-edit' closeButton></Modal.Header>
            <NewForm edit={true} data={props.card} />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Cards;

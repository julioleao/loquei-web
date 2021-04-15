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
  const data = props.card;

  const date = moment(data.updatedAt).format('LL');

  const history = useHistory();

  const RouteChange = () => {
    let path = `/detail/${data._id}`;
    history.push(path);
  };

  if (!data || data === 'undefined') {
    return;
  }

  return (
    <div>
      {!props.edit ? (
        <div id='cards'>
          <Card onClick={RouteChange}>
            <Card.Header className='text-center'>R$ {data.price}</Card.Header>
            <Card.Img
              variant='top'
              src={data.thumbnail}
              style={{ height: '170px' }}
            />

            <Card.Header
              style={{ justifyContent: 'space-between', display: 'flex' }}
            >
              <FaBed />
              <small>{data.bedroom}</small>
              <FaBath />
              <small>{data.bathroom}</small>
              <FaCar />
              <small>{data.garage}</small>
            </Card.Header>

            <Col style={{ alignItems: 'center' }}>
              <Row>
                <small>
                  {data.address.street}, {data.address.neightborhood}
                </small>
              </Row>
              <Row>
                <small>
                  {data.address.city} - {data.address.state}
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
            <Card.Header className='text-center'>R$ {data.price}</Card.Header>
            <Card.Img
              variant='top'
              src={data.thumbnail}
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
          <ShowModal
            show={show}
            onHide={() => setShow(false)}
            postId={data._id}
          />
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

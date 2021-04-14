import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { detelePost } from '../../store/actions/userActions';

const ShowModal = (props) => {
  const dispatch = useDispatch();
  const postDelete = () => {
    dispatch(detelePost(props.postId));
  };

  const postEdit = () => {};
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <h4>Atenção</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Você está prestes a apagar uma publicação. Tem certeza que deseja
          prosseguir?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='info' onClick={props.onHide}>
          Fechar
        </Button>
        <Button variant='danger' onClick={postDelete}>
          Apagar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowModal;

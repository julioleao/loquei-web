import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ShowModal = (props) => {
  return (
    <Modal
      {...props}
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
        <Button variant='danger' onClick={props.onHide}>
          Apagar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowModal;

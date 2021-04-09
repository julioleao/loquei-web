import React from 'react';
import { useState } from 'react';
import { Col, Container, Form, Nav, Row } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { qtdBathroom, qtdBedroom, qtdGarage } from '../../utils/consts';

import './styles.css';

const Sidebar = () => {
  const [form, setForm] = useState({
    price: 0,
    bedroom: '',
    bathroom: '',
    garage: '',
  });
  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <Nav className='col-md-2 d-none d-md-block sidebar'>
      <div className='sidebar-container'>
        <Form>
          <Form.Group>
            <Row>
              <Col md='6'>
                <Form.Label>Preço</Form.Label>
              </Col>
              <Col md='6'>
                <p>R$ {form.price},00</p>
              </Col>
            </Row>

            <Form.Control
              type='range'
              value={form.price}
              max='9999'
              name='price'
              onChange={onChangeForm}
            />
          </Form.Group>

          <Form.Group>
            <Col md='6'>
              <Form.Label>Quartos</Form.Label>
            </Col>

            <Form.Control
              as='select'
              type='numeric'
              name='bedroom'
              autoComplete='transaction-amount'
              onChange={onChangeForm}
              value={form.bedroom}
            >
              <option value=''>Quantidade mínima</option>
              {qtdBedroom.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Col md='6'>
              <Form.Label>Banheiros</Form.Label>
            </Col>

            <Form.Control
              as='select'
              type='numeric'
              name='bathroom'
              autoComplete='transaction-amount'
              onChange={onChangeForm}
              value={form.bathroom}
            >
              <option value=''>Quantidade mínima</option>
              {qtdBathroom.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Col md='6'>
              <Form.Label>Garagem</Form.Label>
            </Col>

            <Form.Control
              as='select'
              type='numeric'
              name='garage'
              autoComplete='transaction-amount'
              onChange={onChangeForm}
              value={form.garage}
            >
              <option value=''>Quantidade mínima</option>
              {qtdGarage.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
    </Nav>
  );
};

export default withRouter(Sidebar);

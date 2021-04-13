import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FiArrowLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

const Forgot = () => {
  //const success = useSelector((state) => state.loading.success);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    token: '',
  });

  const validateEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

  const dispatch = useDispatch();
  async function submitForm(e) {
    e.preventDefault();
  }

  function submitEmail(e) {
    e.preventDefault();
    if (validateEmail.test(form.email)) setSuccess(true);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <div id='forgot-page'>
      <Container fluid='md'>
        {!success ? (
          <Form onSubmit={submitEmail} validated>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type='email'
                name='email'
                required
                autoComplete='email'
                onChange={handleInputChange}
                value={form.email}
              />
              <div className='valid-tooltip'>Looks good!</div>
            </Form.Group>
            <div className='button-group'>
              <Button type='submit'>Resetar senha</Button>
            </div>
          </Form>
        ) : (
          <Form onSubmit={submitForm} validated>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  autoComplete='email'
                  disabled
                  onChange={handleInputChange}
                  value={form.email}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  required
                  minLength={6}
                  autoComplete='current-password'
                  onChange={handleInputChange}
                  value={form.password}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Token</Form.Label>
              <Form.Control
                type='text'
                name='token'
                required
                autoComplete='text'
                onChange={handleInputChange}
                value={form.token}
              />
            </Form.Group>
            <div className='button-group'>
              <Row>
                <Col>
                  <Button
                    type='button'
                    onClick={() => setSuccess(false)}
                    style={{ width: '100%', backgroundColor: 'transparent' }}
                  >
                    <FiArrowLeft size={25} color='#343a40' />
                  </Button>
                </Col>
                <Col>
                  <Button type='submit'>Resetar senha</Button>
                </Col>
              </Row>
            </div>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default Forgot;

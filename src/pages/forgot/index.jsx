import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { FiArrowLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { forgotPassword, resetPassword } from '../../store/actions/userActions';

const Forgot = () => {
  const loading = useSelector((state) => state.loading.loading);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    token: '',
  });

  const validateEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

  const dispatch = useDispatch();
  function submitForm(e) {
    e.preventDefault();

    dispatch(resetPassword(form));
  }

  function submitEmail(e) {
    e.preventDefault();
    if (validateEmail.test(form.email)) {
      dispatch(forgotPassword(form));
      setSuccess(true);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <div id='forgot-page'>
      {!isAuthenticated ? (
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
              </Form.Group>
              <div className='button-group'>
                <Button type='submit'>Resetar senha</Button>
                <Link
                  to='/auth'
                  style={{ alignSelf: 'center', paddingTop: 20 }}
                >
                  Voltar para tela de login
                </Link>
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
                <span id='formSpan'>
                  Copie e cole o token enviado para o e-mail informado.
                </span>
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
                    {loading ? (
                      <Button disabled>
                        <Spinner
                          as='span'
                          animation='border'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />
                      </Button>
                    ) : (
                      <Button type='submit'>Resetar senha</Button>
                    )}
                  </Col>
                </Row>
              </div>
            </Form>
          )}
        </Container>
      ) : (
        <Redirect path='/' to='/list' />
      )}
    </div>
  );
};

export default Forgot;

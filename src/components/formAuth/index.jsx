import React, { useState } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authLogin, authRegister } from '../../store/actions/userActions';

import './styles.css';

const FormAuth = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    setRegisterForm({ ...registerForm, [name]: value });
  }

  function submitRegisterForm(e) {
    e.preventDefault();
    dispatch(authRegister(registerForm));
  }

  function submitLoginForm(e) {
    e.preventDefault();
    dispatch(authLogin(loginForm));
  }
  return (
    <div>
      {isNewUser ? (
        <Container fluid='md'>
          <legend>
            <h2>Novo usuário</h2>
          </legend>

          <Form onSubmit={submitRegisterForm}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type='text'
                name='name'
                autoComplete='name'
                onChange={handleInputChange}
                value={registerForm.name}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type='email'
                name='email'
                autoComplete='email'
                onChange={handleInputChange}
                value={registerForm.email}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  autoComplete='new-password'
                  onChange={handleInputChange}
                  value={registerForm.password}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Confirmar senha</Form.Label>
                <Form.Control
                  type='password'
                  name='confirmPassword'
                  autoComplete='new-password'
                  onChange={handleInputChange}
                  value={registerForm.confirmPassword}
                />
              </Form.Group>
            </Form.Row>

            <div className='button-group'>
              <Button type='submit'>Registrar</Button>
              <button id='link' onClick={() => setIsNewUser(false)}>
                Entrar
              </button>
            </div>
          </Form>
        </Container>
      ) : (
        <Container fluid='md'>
          <legend>
            <h2>Login</h2>
          </legend>

          <Form onSubmit={submitLoginForm}>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type='email'
                name='email'
                autoComplete='email'
                onChange={handleInputChange}
                value={loginForm.email}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type='password'
                name='password'
                autoComplete='current-password'
                onChange={handleInputChange}
                value={loginForm.password}
              />
            </Form.Group>

            <div className='button-group'>
              <Button type='submit'>Entrar</Button>
              <a href='/forgot' style={{ alignSelf: 'center', paddingTop: 20 }}>
                Não lembro a senha
              </a>
              <button id='link' onClick={() => setIsNewUser(true)}>
                Registrar-se
              </button>
            </div>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default FormAuth;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createUser } from '../../services/firebaseService';
import { authLogin } from '../../store/actions/userActions';

import './styles.css';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function submitForm(e) {
    e.preventDefault();

    //const { email, password } = form;

    //console.log(form);
    dispatch(authLogin(form));
    //createUser(email, password);

    //console.log(data);
    /* dispatch(); */
  }

  return (
    <div id='page-cadastrar-imovel'>
      <form onSubmit={submitForm}>
        <fieldset>
          <legend>
            <h2>LOGIN</h2>
          </legend>

          <div className='field'>
            <label htmlFor='email'>E-mail</label>
            <input
              type='email'
              name='email'
              onChange={handleInputChange}
              value={form.email}
            />
          </div>
          <div className='field'>
            <label htmlFor='password'>Senha</label>
            <input
              type='password'
              name='password'
              id='password'
              onChange={handleInputChange}
              value={form.password}
            />
          </div>
        </fieldset>
        <div
          className='button-group'
          style={{
            alignSelf: 'center',
          }}
        >
          <button type='submit'>Login</button>
          <button type='submit'>Registrar</button>
        </div>
        <a href='/forgot' style={{ alignSelf: 'center', paddingTop: 25 }}>
          Não lembro a senha
        </a>
      </form>
    </div>
  );
};

export default Login;

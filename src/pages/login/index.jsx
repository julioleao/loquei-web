import React from 'react';

import './styles.css';

const Login = () => {
  return (
    <div id='page-cadastrar-imovel'>
      <form>
        <fieldset>
          <legend>
            <h2>LOGIN</h2>
          </legend>

          <div className='field'>
            <label htmlFor='email'>E-mail</label>
            <input type='email' name='email' id='email' />
          </div>
          <div className='field'>
            <label htmlFor='password'>Senha</label>
            <input type='password' name='password' id='password' />
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
        <a href='' style={{ alignSelf: 'center', paddingTop: 25 }}>
          Não lembro a senha
        </a>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';

import { createUser } from '../../services/firebaseService';

import './styles.css';

const Forgot = () => {
  const [form, setForm] = useState({
    token: '',
  });
  function submitForm(e) {
    e.preventDefault();

    //const { email, password } = form;

    console.log(form);
    //createUser(email, password);

    //console.log(data);
    /* dispatch(); */
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <div id='page-cadastrar-imovel'>
      <form onSubmit={submitForm}>
        <fieldset>
          <legend>
            <h2>Esqueci a senha</h2>
          </legend>

          <div className='field'>
            <label htmlFor='token'>Token</label>
            <input
              type='text'
              name='token'
              onChange={handleInputChange}
              value={form.token}
            />
          </div>
        </fieldset>
        <div
          className='button-group'
          style={{
            alignSelf: 'center',
          }}
        >
          <button type='submit'>Resetar senha</button>
        </div>
      </form>
    </div>
  );
};

export default Forgot;

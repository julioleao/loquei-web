import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import './styles.css';

const Forgot = () => {
  const [form, setForm] = useState({
    email: '',
  });
  async function submitForm(e) {
    e.preventDefault();
    console.log(form.email);

    return await axios
      .post('/forgotPassword', form)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));

    //const { email, password } = form;

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
      <Form onSubmit={submitForm}>
        <Form.Group>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type='email'
            name='email'
            autoComplete='email'
            onChange={handleInputChange}
            value={form.email}
          />
        </Form.Group>

        <div className='button-group'>
          <Button type='submit'>Resetar senha</Button>
        </div>
      </Form>
    </div>
  );
};

export default Forgot;

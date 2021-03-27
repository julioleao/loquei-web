import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import FormAuth from '../../components/formAuth';

import { authLogin } from '../../store/actions/userActions';

const Auth = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
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
    <div id='login-form'>
      {!isAuthenticated ? <FormAuth /> : <Redirect path='/' to='/list' />}
    </div>
  );
};

export default Auth;

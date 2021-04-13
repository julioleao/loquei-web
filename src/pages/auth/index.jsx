import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import FormAuth from '../../components/formAuth';

const Auth = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div id='login-form'>
      {!isAuthenticated ? <FormAuth /> : <Redirect path='/' to='/list' />}
    </div>
  );
};

export default Auth;

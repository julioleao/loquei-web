import React from 'react';
import { Spinner } from 'react-bootstrap';
import './styles.css';

const Loader = () => {
  return (
    <div className='loader-container'>
      <div className='loader'>
        <Spinner animation='border' className='spinner' />
      </div>
    </div>
  );
};

export default Loader;

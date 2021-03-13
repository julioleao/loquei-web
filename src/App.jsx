import React from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import Header from './components/header';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
      <Container fluid style={{ padding: '0' }}>
        <Header />
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes />
      </Container>
    </div>
  );
}

export default App;

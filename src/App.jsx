import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import Header from './components/header';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import Sidebar from './components/sidebar';

function App() {
  moment().locale('pt-br');
  return (
    <div className='App'>
      <Container fluid style={{ padding: '0' }}>
        <Row>
          <Header />
        </Row>

        <Routes />

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
      </Container>
    </div>
  );
}

export default App;

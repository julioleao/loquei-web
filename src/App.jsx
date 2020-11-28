import React from 'react';
import './App.css';
import Routes from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes />
    </div>
  );
}

export default App;

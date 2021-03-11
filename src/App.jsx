import React from 'react';
import './App.css';
import Routes from './routes';
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

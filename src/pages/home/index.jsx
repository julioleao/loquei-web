import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/logo.svg';

const Home = () => {
  return (
    <div id='page-home'>
      <div className='content'>
        <header>
          <img src={logo} alt='Loquei' />
        </header>
        <main>
          <h1>Aluguel fácil e rápido!</h1>
          <p>Alugue direto com o proprietário e sem burocracia.</p>

          <Link to='/new_ad'>
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um imóvel</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;

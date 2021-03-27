import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';
import '../../styles/globalStyles.css';

const Home = () => {
  return (
    <div>
      <div id='page-home'>
        <div className='content'>
          <main>
            <h1>Aluguel fácil e rápido!</h1>
            <p>Alugue direto com o proprietário e sem burocracia.</p>

            <Link to='/list'>
              <span>
                <FiSearch />
              </span>
              <strong>Busque seu imóvel</strong>
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;

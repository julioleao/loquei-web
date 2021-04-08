import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';
import '../../styles/globalStyles.css';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <div id='page-home'>
      <Container fluid='lg'>
        <h1>Aluguel fácil e rápido!</h1>
        <p>Alugue direto com o proprietário e sem burocracia.</p>

        <Link to='/list'>
          <span>
            <FiSearch />
          </span>
          <strong>Busque seu imóvel</strong>
        </Link>
      </Container>
    </div>
  );
};

export default Home;

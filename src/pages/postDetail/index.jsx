import React from 'react';
import { FiClock, FiInfo } from 'react-icons/fi';

import './styles.css';

export default function Orphanage() {
  return (
    <div id='page-orphanage'>
      <main>
        <div className='orphanage-details'>
          <img
            src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
            alt='Lar das meninas'
          />

          <div className='images'>
            <button className='active' type='button'>
              <img
                src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                alt='Lar das meninas'
              />
            </button>
            <button type='button'>
              <img
                src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                alt='Lar das meninas'
              />
            </button>
            <button type='button'>
              <img
                src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                alt='Lar das meninas'
              />
            </button>
            <button type='button'>
              <img
                src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                alt='Lar das meninas'
              />
            </button>
            <button type='button'>
              <img
                src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                alt='Lar das meninas'
              />
            </button>
            <button type='button'>
              <img
                src='https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg'
                alt='Lar das meninas'
              />
            </button>
          </div>

          <div className='orphanage-details-content'>
            <h1>Lar das meninas</h1>
            <p>
              Presta assistência a crianças de 06 a 15 anos que se encontre em
              situação de risco e/ou vulnerabilidade social.
            </p>

            <div className='map-container'>
              <footer>
                <a href=''>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>
              Venha como se sentir mais à vontade e traga muito amor para dar.
            </p>

            <div className='open-details'>
              <div className='hour'>
                <FiClock size={32} color='#15B6D6' />
                Segunda à Sexta <br />
                8h às 18h
              </div>
              <div className='open-on-weekends'>
                <FiInfo size={32} color='#39CC83' />
                Atendemos <br />
                fim de semana
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

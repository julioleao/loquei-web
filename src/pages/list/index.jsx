import React from 'react';
import { Tabs, Tab, Card } from 'react-bootstrap';

import Map from '../../components/map';
import Cards from '../../components/cards';

import '../../styles/globalStyles.css';
import './styles.css';

const List = () => {
  return (
    <div id='page-map'>
      <aside>
        <main>
          <h2>Escolha um imóvel no mapa</h2>
          <p>E entre em contato direto com o proprietário</p>
        </main>

        <footer>
          <strong>Curitiba</strong>
          <span>Paraná</span>
        </footer>
      </aside>
      <div>
        <Tabs defaultActiveKey='map' id='tab'>
          <Tab eventKey='map' title='Mapa'>
            <Map />
          </Tab>
          <Tab eventKey='cards' title='Lista'>
            <Cards />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default List;

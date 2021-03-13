import React from 'react';
import { Tabs, Tab, Card, Container, Row, Col } from 'react-bootstrap';

import Map from '../../components/map';
import Cards from '../../components/cards';

import '../../styles/globalStyles.css';
import './styles.css';

const List = () => {
  const cards = [
    {
      id: 1,
      title: 'Casa com 2 quartos',
      pic:
        'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg',
      description:
        'Casa grande bem localizada com 2 quartos, 1 banheiro e 1 vaga na garagem',
      updateAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Casa com 2 quartos',
      pic:
        'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg',
      description:
        'Casa grande bem localizada com 2 quartos, 1 banheiro e 1 vaga na garagem',
      updateAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Casa com 2 quartos',
      pic:
        'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg',
      description:
        'Casa grande bem localizada com 2 quartos, 1 banheiro e 1 vaga na garagem',
      updateAt: new Date().toISOString(),
    },
    {
      id: 4,
      title: 'Casa com 2 quartos',
      pic:
        'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg',
      description:
        'Casa grande bem localizada com 2 quartos, 1 banheiro e 1 vaga na garagem',
      updateAt: new Date().toISOString(),
    },
    {
      id: 5,
      title: 'Casa com 2 quartos',
      pic:
        'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg',
      description:
        'Casa grande bem localizada com 2 quartos, 1 banheiro e 1 vaga na garagem',
      updateAt: new Date().toISOString(),
    },
  ];

  return (
    <div id='page-map'>
      <Container fluid style={{ padding: '0' }}>
        <Row>
          <Col sm={3} style={{ padding: '0' }}>
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
          </Col>
          <Col sm={9} style={{ padding: '0' }}>
            <Tabs defaultActiveKey='map'>
              <Tab eventKey='map' title='Mapa'>
                <Map />
              </Tab>
              <Tab eventKey='cards' title='Lista'>
                <Container fluid>
                  <Row className='justify-content-md-center'>
                    {cards.map((card, index) => (
                      <Cards key={index} card={card} />
                    ))}
                  </Row>
                </Container>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default List;

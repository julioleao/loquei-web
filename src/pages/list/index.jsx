import React from 'react';
import { Tabs, Tab, Card, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/pt-br';

import Map from '../../components/map';
import Cards from '../../components/cards';
import { post } from '../../utils/db.json';

import '../../styles/globalStyles.css';
import './styles.css';

const List = () => {
  //console.log(post);

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

                {/*  <Map /> */}
              </Tab>
              <Tab eventKey='cards' title='Lista'>
                <Container fluid>
                  <Row className='justify-content-md-center'>
                    {post.map((post, index) => (
                      <Cards key={index} card={post} />
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

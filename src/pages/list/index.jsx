import React, { useEffect } from 'react';
import { Tabs, Tab, Card, Container, Row, Col } from 'react-bootstrap';
import 'moment/locale/pt-br';

import Map from '../../components/map';
import Cards from '../../components/cards';

import '../../styles/globalStyles.css';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { listPost } from '../../store/actions/postActions';
import Loader from '../../components/loader';

const List = () => {
  const posts = useSelector((state) => state.post);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();
  useEffect(() => dispatch(listPost()), []);
  return (
    <div id='page-map'>
      {loading ? (
        <Loader />
      ) : (
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
                  <Map post={posts} />
                </Tab>
                <Tab eventKey='cards' title='Lista'>
                  <Container fluid>
                    <Row className='justify-content-md-center'>
                      {posts.map((post, index) => (
                        <Cards key={index} card={post} />
                      ))}
                    </Row>
                  </Container>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default List;

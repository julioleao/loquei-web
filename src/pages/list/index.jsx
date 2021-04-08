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
import Sidebar from '../../components/sidebar';

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
          <Row style={{ paddingTop: '73px' }}>
            <Col xs={2} id='sidebar-wrapper'>
              <Sidebar />
            </Col>
            <Col
              xs={10}
              style={{ paddingInline: '0' }}
              id={'page-content-wrapper'}
            >
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

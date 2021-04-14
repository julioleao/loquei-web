import React, { useEffect } from 'react';
import { Tabs, Tab, Container, Row, Col, Form, Nav } from 'react-bootstrap';
import 'moment/locale/pt-br';

import Map from '../../components/map';
import Cards from '../../components/cards';

import '../../styles/globalStyles.css';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { listPost } from '../../store/actions/postActions';
import { useState } from 'react';
import { qtdBathroom, qtdBedroom, qtdGarage } from '../../utils/consts';

const List = () => {
  const posts = useSelector((state) => state.post);
  const [item, setItem] = useState(posts);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    price: 0,
    bedroom: '',
    bathroom: '',
    garage: '',
  });

  const onChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };
  useEffect(() => dispatch(listPost()), []);

  useEffect(() => setItem(posts), [posts]);

  useEffect(() => {
    let filteredPosts = posts;

    if (filter.price > 0) {
      filteredPosts = filteredPosts.filter(
        (item) => item.price <= filter.price
      );
    }

    if (filter.bedroom !== '') {
      filteredPosts = filteredPosts.filter(
        (item) => item.bedroom >= filter.bedroom
      );
    }

    if (filter.bathroom !== '') {
      filteredPosts = filteredPosts.filter(
        (item) => item.bathroom >= filter.bathroom
      );
    }

    if (filter.garage !== '') {
      filteredPosts = filteredPosts.filter(
        (item) => item.garage >= filter.garage
      );
    }

    setItem(filteredPosts);
  }, [filter]);

  return (
    <div id='page-map'>
      <Container fluid style={{ padding: '0' }}>
        <Row style={{ paddingTop: '73px' }}>
          <Col xs={2} id='sidebar-wrapper'>
            <Nav className='col-md-2 d-none d-md-block sidebar'>
              <div className='sidebar-container'>
                <Form>
                  <Form.Group>
                    <Row>
                      <Col md='5'>
                        <Form.Label>Preço</Form.Label>
                      </Col>
                      <Col md='7'>R$ {filter.price},00</Col>
                    </Row>

                    <Form.Control
                      type='range'
                      value={filter.price}
                      max={9999}
                      step={50}
                      name='price'
                      onChange={onChangeFilter}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Col md='6'>
                      <Form.Label>Quartos</Form.Label>
                    </Col>

                    <Form.Control
                      as='select'
                      type='numeric'
                      name='bedroom'
                      autoComplete='transaction-amount'
                      onChange={onChangeFilter}
                      value={filter.bedroom}
                    >
                      <option value=''>Quantidade mínima</option>
                      {qtdBedroom.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Col md='6'>
                      <Form.Label>Banheiros</Form.Label>
                    </Col>

                    <Form.Control
                      as='select'
                      type='numeric'
                      name='bathroom'
                      autoComplete='transaction-amount'
                      onChange={onChangeFilter}
                      value={filter.bathroom}
                    >
                      <option value=''>Quantidade mínima</option>
                      {qtdBathroom.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Col md='6'>
                      <Form.Label>Garagem</Form.Label>
                    </Col>

                    <Form.Control
                      as='select'
                      type='numeric'
                      name='garage'
                      autoComplete='transaction-amount'
                      onChange={onChangeFilter}
                      value={filter.garage}
                    >
                      <option value=''>Quantidade mínima</option>
                      {qtdGarage.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
            </Nav>
          </Col>
          <Col
            xs={10}
            style={{ paddingInline: '0' }}
            id={'page-content-wrapper'}
          >
            <Tabs defaultActiveKey='map'>
              <Tab eventKey='map' title='Mapa'>
                <Map post={item} />
              </Tab>
              <Tab eventKey='cards' title='Lista'>
                <Container fluid>
                  <Row className='justify-content-md-center'>
                    {item.map((post, index) => (
                      <Cards key={index} card={post} edit={false} />
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

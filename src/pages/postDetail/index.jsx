import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  InputGroup,
  ListGroup,
  Row,
} from 'react-bootstrap';
import {
  FaBath,
  FaBed,
  FaCar,
  FaEnvelope,
  FaMapMarkedAlt,
  FaWhatsapp,
} from 'react-icons/fa';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import Gallery from '../../components/gallery';
import Loader from '../../components/loader';
import { tileTheme } from '../../components/map';
import { postDetail } from '../../store/actions/postActions';
import { mapIcon } from '../../components/markerMap';
import './styles.css';

const PostDetail = (props) => {
  const data = props.match.params.id;
  const { loading } = useSelector((state) => state.loading);
  const post = useSelector((state) => state.detail.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postDetail(data));
  }, [data]);

  if (!post) {
    return <Loader />;
  }

  const wappLink = `https://api.whatsapp.com/send?phone=+55${post.contact.phone}`;
  const googleMaps = `http://www.google.com/maps/place/${post.mapLocation.lat},${post.mapLocation.lon}`;

  return (
    <div>
      <div id='detail'>
        <Container fluid='md'>
          {loading ? (
            <Loader />
          ) : (
            <div>
              <Gallery pics={post} />

              <ListGroup horizontal>
                <ListGroup.Item>
                  <InputGroup className='mb-3'>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FaBed />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <InputGroup.Append>
                      <InputGroup.Text>{post.bedroom}</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                  <InputGroup className='mb-3'>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FaBath />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <InputGroup.Append>
                      <InputGroup.Text>{post.bathroom}</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                  <InputGroup className='mb-3'>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FaCar />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <InputGroup.Append>
                      <InputGroup.Text>{post.garage}</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </ListGroup.Item>
              </ListGroup>

              <legend>
                <h2>{post.title}</h2>
              </legend>

              <div style={{ marginBottom: '40px' }}>
                <Row>
                  <Col md='7'>{post.description}</Col>
                  <Col md='5'>
                    <Card>
                      <Card.Header>
                        <Row>
                          <Col>
                            <strong>TOTAL</strong>
                          </Col>
                          <Col>
                            <strong>
                              R$ {post.price + post.condo + post.iptu},00
                            </strong>
                          </Col>
                        </Row>
                      </Card.Header>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <Row>
                            <Col>Aluguel</Col>
                            <Col>R$ {post.price},00</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>Condomínio</Col>
                            <Col>R$ {post.condo},00</Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>IPTU</Col>
                            <Col>R$ {post.iptu},00</Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                </Row>
              </div>

              <MapContainer
                center={[post.mapLocation.lat, post.mapLocation.lon]}
                zoom={14}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution={tileTheme.attribution}
                  url={tileTheme.url}
                />
                <Marker
                  position={[post.mapLocation.lat, post.mapLocation.lon]}
                  icon={mapIcon}
                >
                  <Popup>
                    <Button
                      className='google-maps-btn'
                      onClick={() => window.open(googleMaps, '_blank')}
                    >
                      <FaMapMarkedAlt size={20} />
                      Ver no Google Maps
                    </Button>
                  </Popup>
                </Marker>
              </MapContainer>

              <Row>
                <Col>
                  <Row>
                    <strong>Logradouro</strong>
                  </Row>
                  <Row>
                    <p>{post.address.street}</p>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <strong>Bairro</strong>
                  </Row>
                  <Row>
                    <p>{post.address.neighborhood}</p>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <strong>Cidade</strong>
                  </Row>
                  <Row>
                    <p>
                      {post.address.city} - {post.address.state}
                    </p>
                  </Row>
                </Col>
              </Row>

              <Row>
                <legend>
                  <Col xs>
                    <h2>Contato</h2>
                  </Col>
                  <Col md='auto'>
                    <h5>{post.contact.name}</h5>
                  </Col>
                </legend>
              </Row>

              <div id='contact-button'>
                <Row style={{ justifyContent: 'center' }}>
                  <Col md='auto'>
                    <Button
                      type='button'
                      className='wapp-button'
                      onClick={() => window.open(wappLink, '_blank')}
                    >
                      <FaWhatsapp size={25} color='#FFF' /> WhatsApp
                    </Button>
                  </Col>

                  <Col md='auto'>
                    <Button
                      type='button'
                      className='email-button'
                      onClick={() =>
                        (window.location.href = `mailto:${post.contact.email}`)
                      }
                    >
                      <FaEnvelope size={25} color='#FFF' /> E-mail
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default PostDetail;

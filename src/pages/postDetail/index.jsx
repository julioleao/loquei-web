import React, { useEffect } from 'react';
import {
  Button,
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
      {loading ? (
        <Loader />
      ) : (
        <Container fluid='md'>
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

          <Row>
            <legend>
              <Col xs>
                <h2>{post.title}</h2>
              </Col>
              <Col md='auto'>
                <h4>Aluguel R$</h4>
                <h6>Condomínio R$</h6>
                <h6>Total R$</h6>
              </Col>
              <Col md='auto'>
                <h4>{post.price},00</h4>
                <h6>{post.condo},00</h6>
                <h6>{post.price + post.condo},00</h6>
              </Col>
            </legend>
          </Row>

          <div style={{ marginBottom: '40px' }}>
            <Row>{post.description}</Row>
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

          <ListGroup horizontal>
            <ListGroup.Item>Rua: {post.address.street}</ListGroup.Item>
            <ListGroup.Item>Bairro: {post.address.neighborhood}</ListGroup.Item>
            <ListGroup.Item>
              Cidade: {post.address.city} - {post.address.state}
            </ListGroup.Item>
          </ListGroup>

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
        </Container>
      )}
    </div>
  );
};

export default PostDetail;

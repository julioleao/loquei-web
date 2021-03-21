import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Popup, Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';
import Leaflet from 'leaflet';

import pinHome from '../../assets/pinHome.svg';
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { FaBath, FaBed, FaCar } from 'react-icons/fa';

export const mapIcon = Leaflet.icon({
  iconUrl: pinHome,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const MarkerMap = (props) => {
  const {
    _id,
    title,
    pictures,
    description,
    updateAt,
    bedroom,
    bathroom,
    garage,
    price,
    iptu,
    condo,
    lat,
    lon,
  } = props.marker;
  return (
    <div>
      <Marker position={[lat, lon]} icon={mapIcon}>
        <Popup closeButton={false} className='map-popup'>
          <Card>
            <Card.Header className='text-center'>
              Aluguel: R$ {price}
            </Card.Header>
            <Card.Img variant='top' src={pictures[0]} />
            <Card.Header
              style={{ justifyContent: 'space-between', display: 'flex' }}
            >
              <FaBed />
              <small>{bedroom}</small>
              <FaBath />
              <small>{bathroom}</small>
              <FaCar />
              <small>{garage}</small>
            </Card.Header>
            <Card.Body>
              <Link to={`/detail/${_id}`}>
                <FiArrowRight size={20} color='#FFF' />
              </Link>

              <small style={{ paddingTop: '20px' }}>Criado:</small>
              <small className='text-muted'>{updateAt}</small>
            </Card.Body>
          </Card>
          {/*  <Container fluid>
            <Col>
              <Row>{title}</Row>
              <Row>
                <Image src={pictures[0]} thumbnail />
              </Row>
            </Col>
          </Container> */}
        </Popup>
      </Marker>
    </div>
  );
};

export default MarkerMap;

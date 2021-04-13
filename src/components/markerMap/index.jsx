import React from 'react';
import { Popup, Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';
import Leaflet from 'leaflet';

import pinHome from '../../assets/pinHome.svg';
import { Card } from 'react-bootstrap';
import { FaBath, FaBed, FaCar } from 'react-icons/fa';
import moment from 'moment';

export const mapIcon = Leaflet.icon({
  iconUrl: pinHome,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const MarkerMap = (props) => {
  const {
    _id,
    thumbnail,
    bedroom,
    bathroom,
    garage,
    price,
    mapLocation,
    createdAt,
  } = props.marker;
  const date = moment(createdAt).format('LL');

  const { lat, lon } = mapLocation;
  return (
    <div>
      <Marker position={[lat, lon]} icon={mapIcon} id='marker'>
        <Popup closeButton={false} className='map-popup'>
          <Card>
            <Card.Header className='text-center'>
              Aluguel: R$ {price}
            </Card.Header>
            <Card.Img variant='top' src={thumbnail} />
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
                Ver imóvel
                {/* <FiArrowRight size={20} color='#FFF' /> */}
              </Link>

              <small style={{ paddingTop: '20px' }}>Criado : </small>
              <small className='text-muted'>{date}</small>
            </Card.Body>
          </Card>
        </Popup>
      </Marker>
    </div>
  );
};

export default MarkerMap;

import React from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import { Link } from 'react-router-dom';

import pinHome from '../../assets/pinHome.svg';

const mapIcon = Leaflet.icon({
  iconUrl: pinHome,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const Map = () => {
  return (
    <div style={{ width: '100%', height: '87.5vh' }}>
      <MapContainer
        center={[-25.4723154, -49.2808289]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '87.5vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker position={[-25.4723154, -49.2808289]} icon={mapIcon}>
          <Popup closeButton={false} className='map-popup'>
            You are here
            <Link to='/detail/1'>
              <FiArrowRight size={20} color='#FFF' />
            </Link>
          </Popup>
        </Marker>
      </MapContainer>

      <Link to='/create' className='new-post'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
};

export default Map;

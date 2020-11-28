import React from 'react';
import { FiArrowLeft, FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import Leaflet from 'leaflet';

import logo from '../../assets/logo.svg';
import mapMarker from '../../assets/mapMarker.svg';

import '../../styles/globalStyles.css';
import './styles.css';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,
});

const List = () => {
  return (
    <div id='page-map'>
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
      <MapContainer
        center={[-25.4723154, -49.2808289]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker position={[-25.4723154, -49.2808289]}>
          <Popup closeButton={false} className='map-popup'>
            You are here
            <Link to=''>
              <FiArrowRight size={20} color='#FFF' />
            </Link>
          </Popup>
        </Marker>
      </MapContainer>

      <Link to='/new_post' className='new-post'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
};

export default List;

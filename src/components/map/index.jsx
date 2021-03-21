import React from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import { Link } from 'react-router-dom';

import pinHome from '../../assets/pinHome.svg';
import MarkerMap from '../markerMap';
import { post } from '../../utils/db.json';

const mapIcon = Leaflet.icon({
  iconUrl: pinHome,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export const tileTheme = {
  attribution:
    '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: `https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=${process.env.REACT_APP_MAP_THEME_TOKEN}`,
};

const Map = (props) => {
  return (
    <div style={{ width: '100%', height: '87.5vh' }}>
      <MapContainer
        center={[-25.4723154, -49.2808289]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '87.5vh' }}
      >
        <TileLayer attribution={tileTheme.attribution} url={tileTheme.url} />

        {post.map((post, index) => (
          <MarkerMap key={index} marker={post} />
        ))}

        {/*  <Marker position={[lat, lon]} icon={mapIcon}>
          <Popup closeButton={false} className='map-popup'>
            {title}
            <img src={picture} />
            <Link to='/detail/1'>
              <FiArrowRight size={20} color='#FFF' />
            </Link>
          </Popup>
        </Marker> */}
      </MapContainer>

      <Link to='/create' className='new-post'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
};

export default Map;

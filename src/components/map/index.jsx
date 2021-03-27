import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';

import MarkerMap from '../markerMap';

export const tileTheme = {
  attribution:
    '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: `https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=${process.env.REACT_APP_MAP_THEME_TOKEN}`,
};

const Map = (props) => {
  const { post } = props;
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
      </MapContainer>

      <Link to='/create' className='new-post'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
};

export default Map;

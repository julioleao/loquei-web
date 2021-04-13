import React, { useEffect } from 'react';
import { useState } from 'react';
import ImageGallery from 'react-image-gallery';

const Gallery = (props) => {
  const [gallery, setGallery] = useState([]);
  const { pictures } = props.pics;

  const data = pictures.map((img) => ({ original: img, thumbnail: img }));

  useEffect(() => {
    setGallery(data);
  }, []);

  return <ImageGallery items={gallery} autoPlay={true} />;
};

export default Gallery;

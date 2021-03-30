import React, { useEffect } from 'react';
import { useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';

const images = [
  'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/8b021fceceb6d6fcb603ab8cb6c62a89.jpg',
  'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/acd72a62b51505c4da4aa3dfea8eed3c.jpg',
  'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/d790047409cff683d88e522eef163479.jpg',
  'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/f8b73780398b48f59fdbd1c5717bd5f8.jpg',
  'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/d45cf6879edffa0fd1f63a76eacaf34f.jpg',
  'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/413a8f5ebaee41c378bfeffac2fed09f.jpg',
  'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/68047070b4a37df6f464b25e2404b176.jpg',
  'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/7300d5d4a8c39e110ced4869df9ef6b6.jpg',
];

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

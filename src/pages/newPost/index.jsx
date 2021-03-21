import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup } from 'react-bootstrap';
import {
  FaBath,
  FaBed,
  FaBuilding,
  FaCar,
  FaDollarSign,
  FaEnvelope,
  FaMailBulk,
  FaWhatsapp,
} from 'react-icons/fa';
import { FiDollarSign, FiMail } from 'react-icons/fi';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import cep from 'cep-promise';

import { tileTheme } from '../../components/map';
import { mapIcon } from '../../components/markerMap';
import { useDispatch, useSelector } from 'react-redux';
import { newPost, searchCep } from '../../store/actions/postActions';

const states = [
  'AC',
  'AL',
  'AM',
  'AP',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RO',
  'RS',
  'RR',
  'SC',
  'SE',
  'SP',
  'TO',
];

const NewPost = () => {
  const item = useSelector((state) => state.post);
  const [position, setPosition] = useState({ lat: 0, lon: 0 });
  const [addressForm, setAddressForm] = useState({
    cep: '',
    city: '',
    neighborhood: '',
    state: '',
    street: '',
  });
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    condo: 0,
    bedroom: -1,
    bathroom: -1,
    garage: -1,
    pictures: [
      'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/8b021fceceb6d6fcb603ab8cb6c62a89.jpg',
      'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/acd72a62b51505c4da4aa3dfea8eed3c.jpg',
      'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/d790047409cff683d88e522eef163479.jpg',
      'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/f8b73780398b48f59fdbd1c5717bd5f8.jpg',
      'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/d45cf6879edffa0fd1f63a76eacaf34f.jpg',
      'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/413a8f5ebaee41c378bfeffac2fed09f.jpg',
      'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/68047070b4a37df6f464b25e2404b176.jpg',
      'https://resizedimgs.vivareal.com/fit-in/870x653/vr.images.sp/7300d5d4a8c39e110ced4869df9ef6b6.jpg',
    ],
    name: '',
    email: '',
    phone: '',
  });
  const dispatch = useDispatch();
  var qtdBedroom, qtdBathroom, qtdGarage;
  qtdBedroom = qtdBathroom = qtdGarage = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (item) setAddressForm(item.cep);
  }, [item]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition({ lat: e.latlng.lat, lon: e.latlng.lng });
      },
    });
    console.log(position);
    return position === null ? null : (
      <Marker position={position} icon={mapIcon}>
        <Popup>Seu imóvel está aqui</Popup>
      </Marker>
    );
  }
  function onChangeForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function onBlurCep(e) {
    const cep = e.target.value?.replace(/[^0-9]/g, '');

    console.log(cep.length);

    const { name, value } = e.target;

    if (cep.length > 5) {
      dispatch(searchCep(cep));
      setAddressForm({ ...addressForm, [name]: value });
      console.log(addressForm);
    }

    //cep && setForm({ ...form, street, neighborhood, city, uf });
  }

  function submitForm(e) {
    e.preventDefault();
    const { cep, street, neighborhood, city, state } = searchCep;
    const {
      title,
      description,
      price,
      condo,
      bedroom,
      bathroom,
      garage,
      pictures,
      name,
      email,
      phone,
    } = form;
    const { lat, lon } = position;

    const data = {
      title,
      description,
      price,
      condo,
      bedroom,
      bathroom,
      garage,
      pictures,
      mapLocation: {
        lat,
        lon,
      },
      address: {
        cep,
        street,
        neighborhood,
        city,
        state,
      },
      contact: {
        name,
        email,
        phone,
      },
    };

    dispatch(newPost(data));
    /*
    const { name, email, whatsapp, title } = formData;
    const { street, neighborhood, city, uf, bedroom, bathroom } = form;
    const [latitude, longitude] = position;

    const data = {
      name,
      email,
      whatsapp,
      title,
      street,
      neighborhood,
      city,
      uf,
      latitude,
      longitude,
      bedroom,
      bathroom,
    };

    console.log(pushData('post', data));

    console.log(data);
    dispatch(); */
  }

  return (
    <Container fluid='md'>
      <Form onSubmit={submitForm}>
        <h1>Publique seu imóvel</h1>

        <legend>
          <h4>Detalhes do imóvel</h4>
        </legend>

        <Form.Group>
          <Form.Label>Título</Form.Label>
          <Form.Control
            type='text'
            name='title'
            autoComplete='name'
            onChange={onChangeForm}
            value={form.title}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as='textarea'
            type='text'
            name='description'
            autoComplete='text'
            onChange={onChangeForm}
            value={form.description}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Aluguel</Form.Label>
            <InputGroup className='mb-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaDollarSign />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='numeric'
                name='price'
                autoComplete='transaction-amount'
                onChange={onChangeForm}
                value={form.price}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Condomínio</Form.Label>
            <span id='formSpan'>(Opcional)</span>
            <InputGroup className='mb-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaBuilding />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='numeric'
                name='condo'
                autoComplete='transaction-amount'
                onChange={onChangeForm}
                value={form.condo}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Quartos</Form.Label>
            <InputGroup className='mb-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaBed />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as='select'
                type='numeric'
                name='bedroom'
                autoComplete='transaction-amount'
                onChange={onChangeForm}
                value={form.bedroom}
              >
                <option value='-1'>Selecione a quantidade</option>
                {qtdBedroom.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Banheiros</Form.Label>
            <InputGroup className='mb-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaBath />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as='select'
                type='numeric'
                name='bathroom'
                autoComplete='number'
                onChange={onChangeForm}
                value={form.bathroom}
              >
                <option value='-1'>Selecione a quantidade</option>
                {qtdBathroom.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Garagem</Form.Label>
            <InputGroup className='mb-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaCar />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as='select'
                type='numeric'
                name='garage'
                autoComplete='number'
                onChange={onChangeForm}
                value={form.garage}
              >
                <option value='-1'>Selecione a quantidade</option>
                {qtdGarage.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <legend>
          <h4>Dados do imóvel</h4>
        </legend>

        <Form.Row>
          <Form.Group as={Col} md='4'>
            <Form.Label>CEP</Form.Label>
            <Form.Control
              type='text'
              name='cep'
              autoComplete='postal-code'
              //onBlur={onBlurCep}
              onChange={onBlurCep}
              value={addressForm.cep}
            />
          </Form.Group>
          <Form.Group as={Col} md='8'>
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type='text'
              name='street'
              autoComplete='address-line1'
              onChange={onBlurCep}
              value={addressForm.street}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md='5'>
            <Form.Label>Bairro</Form.Label>

            <Form.Control
              type='numeric'
              name='neightborhood'
              autoComplete='address-level3'
              onChange={onBlurCep}
              value={addressForm.neighborhood}
            />
          </Form.Group>
          <Form.Group as={Col} md='2'>
            <Form.Label>Estado</Form.Label>

            <Form.Control
              as='select'
              type='text'
              name='state'
              autoComplete='address-level1'
              onChange={onBlurCep}
              value={addressForm.state}
              custom
            >
              <option value='0'>Selecione o estado</option>
              {states.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md='5'>
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              type='text'
              name='city'
              autoComplete='address-level2'
              onChange={onBlurCep}
              value={addressForm.city}
            />
          </Form.Group>
        </Form.Row>

        <legend>
          <h4>Local do imóvel</h4>
          <span id='formSpan'>Selecione o local no mapa</span>
        </legend>
        <fieldset>
          <MapContainer
            center={position === [0, 0] ? position : [-25.4723154, -49.2808289]}
            zoom={5}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution={tileTheme.attribution}
              url={tileTheme.url}
            />
            <LocationMarker />
          </MapContainer>
        </fieldset>

        <legend>
          <h4>Informações de contato</h4>
        </legend>

        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type='text'
            name='name'
            autoComplete='name'
            onChange={onChangeForm}
            value={form.name}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>E-mail</Form.Label>
            <InputGroup className='mb-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='email'
                name='email'
                autoComplete='email'
                onChange={onChangeForm}
                value={form.email}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>WhatsApp</Form.Label>
            <InputGroup className='mb-2'>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaWhatsapp />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='tel'
                name='phone'
                autoComplete='tel-national'
                onChange={onChangeForm}
                value={form.phone}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <div className='button-group'>
          <Button type='submit'>Publicar</Button>
        </div>
      </Form>
    </Container>
  );
};

export default NewPost;

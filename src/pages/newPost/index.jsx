import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import {
  FaBath,
  FaBed,
  FaBuilding,
  FaCar,
  FaDollarSign,
  FaEnvelope,
  FaFileInvoiceDollar,
  FaWhatsapp,
} from 'react-icons/fa';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';

import { tileTheme } from '../../components/map';
import { mapIcon } from '../../components/markerMap';
import { newPost, searchCep } from '../../store/actions/postActions';
import {
  ufs,
  model,
  qtdBathroom,
  qtdBedroom,
  qtdGarage,
  mapLocation,
  address,
  contact,
  toastProps,
} from '../../utils/consts';
import Loader from '../../components/loader';
import './styles.css';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

const NewPost = () => {
  const postLocation = useSelector((state) => state.cep.postLocation);
  const loading = useSelector((state) => state.loading.loading);
  const loadCep = useSelector((state) => state.loading.loadCep);
  const [form, setForm] = useState(model);
  const [images, setImages] = useState([]);
  const [formAddress, setFormAddress] = useState(address);
  const [formContact, setFormContact] = useState(contact);
  const [formMapLocation, setFormMapLocation] = useState(mapLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postLocation && postLocation !== 'undefined')
      setFormAddress(postLocation);
  }, [postLocation]);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFormMapLocation({ ...formMapLocation, lat: lat, lon: lng });
      },
    });
    return formMapLocation === null ? null : (
      <Marker position={formMapLocation} icon={mapIcon}>
        <Popup>Seu imóvel está aqui</Popup>
      </Marker>
    );
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        'WEBP',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  const onChangeFile = async (e) => {
    const fi = e.target;
    let image = [];
    if (fi.files.length <= 9) {
      for (let i = 0; i < fi.files.length; i++) {
        const file = fi.files[i];
        image[i] = await resizeFile(file);
      }
    } else {
      return toast.error('Quantidade máxima de fotos são 9', toastProps);
    }

    setImages(image);
  };

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onChangeFormContact = (e) => {
    const { name, value } = e.target;
    setFormContact({
      ...formContact,
      [name]: value,
    });
  };

  const onChangeFormAddress = (e) => {
    const { name, value } = e.target;
    if (name === 'cep' && value.length > 7) {
      dispatch(searchCep(value));
    }
    setFormAddress({
      ...formAddress,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      price,
      condo,
      iptu,
      bedroom,
      bathroom,
      garage,
    } = form;
    const { lat, lon } = formMapLocation;
    const { cep, city, neighborhood, state, street } = formAddress;
    const { name, email, phone } = formContact;
    const data = {
      title,
      description,
      price,
      condo,
      iptu,
      bedroom,
      bathroom,
      garage,
      thumbnail: images[0],
      pictures: images,
      mapLocation: {
        lat,
        lon,
      },
      address: {
        cep,
        city,
        neighborhood,
        state,
        street,
      },
      contact: {
        name,
        email,
        phone,
      },
    };
    dispatch(newPost(data));
  };

  return (
    <div id='new-post'>
      <Container fluid='md'>
        <Form onSubmit={submitForm} validated>
          <h1>Publique seu imóvel</h1>

          <legend>
            <h4>Detalhes do imóvel</h4>
          </legend>

          <Form.Group>
            <Form.Label>Título</Form.Label>
            <span id='formSpan'>*</span>
            <Form.Control
              type='text'
              name='title'
              autoComplete='name'
              required
              minLength={10}
              onChange={onChangeForm}
              value={form.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <span id='formSpan'>(Mínimo 100 caracteres)*</span>
            <Form.Control
              as='textarea'
              type='hidden'
              name='description'
              required
              minLength={100}
              onChange={onChangeForm}
              value={form.description}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Aluguel</Form.Label>
              <span id='formSpan'>*</span>
              <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaDollarSign />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='number'
                  name='price'
                  required
                  autoComplete='transaction-amount'
                  onChange={onChangeForm}
                  value={form.price}
                />
                <InputGroup.Append>
                  <InputGroup.Text>,00</InputGroup.Text>
                </InputGroup.Append>
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
                  type='number'
                  name='condo'
                  autoComplete='transaction-amount'
                  onChange={onChangeForm}
                  value={form.condo}
                />
                <InputGroup.Append>
                  <InputGroup.Text>,00</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>IPTU</Form.Label>
              <span id='formSpan'>(Opcional)</span>
              <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaFileInvoiceDollar />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='number'
                  name='iptu'
                  autoComplete='transaction-amount'
                  onChange={onChangeForm}
                  value={form.iptu}
                />
                <InputGroup.Append>
                  <InputGroup.Text>,00</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Quartos</Form.Label>
              <span id='formSpan'>*</span>
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
                  required
                  autoComplete='transaction-amount'
                  onChange={onChangeForm}
                  value={form.bedroom}
                >
                  <option value=''>Selecione a quantidade</option>
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
              <span id='formSpan'>*</span>
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
                  required
                  autoComplete='number'
                  onChange={onChangeForm}
                  value={form.bathroom}
                >
                  <option value=''>Selecione a quantidade</option>
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
              <span id='formSpan'>*</span>
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
                  required
                  autoComplete='number'
                  onChange={onChangeForm}
                  value={form.garage}
                >
                  <option value=''>Selecione a quantidade</option>
                  {qtdGarage.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Label>Fotos</Form.Label>
            <span id='formSpan'>(Máximo 9 fotos)*</span>
            <div className='images-container'>
              {images.map((img, index) => {
                return <img key={index} src={img} alt='' />;
              })}
              <label htmlFor='image[]' id='new-image'>
                <FiPlus suze={24} color='#15b6d6' />
              </label>
              <InputGroup>
                <FormControl
                  id='image[]'
                  type='file'
                  multiple
                  required
                  minLength={1}
                  maxLength={9}
                  accept='image/*'
                  onChange={onChangeFile}
                />
              </InputGroup>
            </div>
          </Form.Group>

          <legend>
            <h4>Dados do imóvel</h4>
          </legend>

          {loadCep ? (
            <Loader />
          ) : (
            <div>
              <Form.Row>
                <Form.Group as={Col} md='4'>
                  <Form.Label>CEP</Form.Label>
                  <span id='formSpan'>*</span>
                  <Form.Control
                    type='text'
                    name='cep'
                    required
                    autoComplete='postal-code'
                    onChange={onChangeFormAddress}
                    value={formAddress.cep}
                  />
                </Form.Group>
                <Form.Group as={Col} md='8'>
                  <Form.Label>Endereço</Form.Label>
                  <span id='formSpan'>*</span>
                  <Form.Control
                    type='text'
                    name='street'
                    required
                    autoComplete='address-line1'
                    onChange={onChangeFormAddress}
                    value={formAddress.street}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md='5'>
                  <Form.Label>Bairro</Form.Label>
                  <span id='formSpan'>*</span>
                  <Form.Control
                    type='numeric'
                    name='neighborhood'
                    required
                    autoComplete='address-level3'
                    onChange={onChangeFormAddress}
                    value={formAddress.neighborhood}
                  />
                </Form.Group>
                <Form.Group as={Col} md='2'>
                  <Form.Label>Estado</Form.Label>
                  <span id='formSpan'>*</span>
                  <Form.Control
                    as='select'
                    type='text'
                    name='state'
                    required
                    autoComplete='address-level1'
                    onChange={onChangeFormAddress}
                    value={formAddress.state}
                    custom
                  >
                    <option value='0'>Selecione o estado</option>
                    {ufs.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} md='5'>
                  <Form.Label>Cidade</Form.Label>
                  <span id='formSpan'>*</span>
                  <Form.Control
                    type='text'
                    name='city'
                    required
                    autoComplete='address-level2'
                    onChange={onChangeFormAddress}
                    value={formAddress.city}
                  />
                </Form.Group>
              </Form.Row>
            </div>
          )}

          <legend>
            <h4>Local do imóvel</h4>
            <span id='formSpan'>Selecione o local no mapa *</span>
          </legend>
          <fieldset>
            <MapContainer
              center={
                formMapLocation === [0, 0]
                  ? formMapLocation
                  : [-25.4723154, -49.2808289]
              }
              zoom={4}
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
            <span id='formSpan'>*</span>
            <Form.Control
              type='text'
              name='name'
              autoComplete='name'
              required
              onChange={onChangeFormContact}
              value={formContact.name}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>E-mail</Form.Label>
              <span id='formSpan'>*</span>
              <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaEnvelope />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='email'
                  name='email'
                  required
                  autoComplete='email'
                  onChange={onChangeFormContact}
                  value={formContact.email}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>WhatsApp</Form.Label>
              <span id='formSpan'>*</span>
              <InputGroup className='mb-2'>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaWhatsapp />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='tel'
                  name='phone'
                  required
                  autoComplete='tel-national'
                  onChange={onChangeFormContact}
                  value={formContact.phone}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <div className='button-group'>
            {loading ? (
              <Button variant='primary' disabled>
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              </Button>
            ) : (
              <Button type='submit'>Publicar</Button>
            )}
          </div>
          <span id='formSpan'>(*) Campo obrigatório</span>
        </Form>
      </Container>
    </div>
  );
};

export default NewPost;

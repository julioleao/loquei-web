import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { useDispatch } from 'react-redux';

import './styles.css';
import logo from '../../assets/logo.svg';
import { pushData } from '../../services/firebaseService';
import Axios from 'axios';

const NewPost = () => {
  const [position, setPosition] = useState([0, 0]);
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    addName: '',
  });
  const [form, setForm] = useState({
    cep: '',
    street: '',
    neighborhood: '',
    city: '0',
    uf: '0',
    bedroom: 0,
    bathroom: 0,
  });
  const qtdBedroom = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const qtdBathroom = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const dispatch = useDispatch();

  function submitForm(e) {
    e.preventDefault();
    const { name, email, whatsapp, addName } = formData;
    const { street, neighborhood, city, uf, bedroom, bathroom } = form;
    const [latitude, longitude] = position;

    const data = {
      name,
      email,
      whatsapp,
      addName,
      street,
      neighborhood,
      city,
      uf,
      latitude,
      longitude,
      bedroom,
      bathroom,
    };

    pushData('post', data);
    //console.log(data);
    /* dispatch(); */
  }

  useEffect(() => {
    Axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    ).then((res) => {
      const ufs = res.data.map((uf) => uf.sigla);
      setUfs(ufs);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.uf}/municipios`
    ).then((res) => {
      const city = res.data.map((city) => city.nome);
      //console.log(city);
      setCities(city);
    });
  }, [form.uf]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function onBlurCep(e) {
    const cep = e.target.value?.replace(/[^0-9]/g, '');

    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    cep &&
      Axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        .then((res) => {
          const { street, neighborhood, city, uf } = res.data;
          setForm({ ...form, street, neighborhood, city, uf });
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
  }

  return (
    <div id='page-cadastrar-imovel'>
      <form onSubmit={submitForm}>
        <h1>Cadastrar novo imóvel</h1>

        <fieldset>
          <legend>
            <h2>Dados para contato</h2>
          </legend>

          <div className='field'>
            <label htmlFor='name'>Nome</label>
            <input
              type='text'
              name='name'
              id='name'
              onChange={handleInputChange}
            />
          </div>

          <div className='field-group'>
            <div className='field'>
              <label htmlFor='email'>E-mail</label>
              <input
                type='email'
                name='email'
                id='email'
                onChange={handleInputChange}
              />
            </div>
            <div className='field'>
              <label htmlFor='whatsapp'>WhatsApp</label>
              <input
                type='text'
                name='whatsapp'
                id='whatsapp'
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Local do imóvel</h2>
          </legend>

          <div className='field'>
            <label htmlFor='addName'>Título do anúncio</label>
            <input
              type='text'
              name='addName'
              id='addName'
              onChange={handleInputChange}
              value={formData.addName}
            />
          </div>

          <div className='field'>
            <label htmlFor='cep'>Informe o CEP</label>
            <input type='text' name='cep' id='cep' onBlur={onBlurCep} />
          </div>

          <div className='field-group'>
            <div className='field'>
              <label htmlFor='street'>Rua</label>
              <input
                type='text'
                name='street'
                id='street'
                onChange={onBlurCep}
                value={form.street}
              />
            </div>
            <div className='field'>
              <label htmlFor='neighborhood'>Bairro</label>
              <input
                type='text'
                name='neighborhood'
                id='neighborhood'
                onChange={onBlurCep}
                value={form.neighborhood}
              />
            </div>
          </div>
          <div className='field-group'>
            <div className='field'>
              <label htmlFor='uf'>Estado</label>
              <select name='uf' id='uf' value={form.uf} onChange={onBlurCep}>
                <option value='0'>Selecione o estado</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className='field'>
              <label htmlFor='city'>Cidade</label>
              <select
                name='city'
                id='city'
                value={form.city}
                onChange={onBlurCep}
              >
                <option value='0'>Selecione o cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço abaixo</span>
          </legend>
          <MapContainer
            center={position === [0, 0] ? position : [-25.4723154, -49.2808289]}
            zoom={5}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <LocationMarker />
          </MapContainer>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Dados do imóvel</h2>
          </legend>

          <div className='field'>
            <label htmlFor='about'>
              Sobre <span>Máximo de 300 caracteres</span>
            </label>
            <textarea id='name' maxLength={300} />
          </div>

          <div className='field'>
            <label htmlFor='images'>Fotos</label>

            <div className='uploaded-image'></div>

            <button className='new-image'>
              <FiPlus size={24} color='#4abdac' />
            </button>
          </div>

          <div className='field-group'>
            <div className='field'>
              <label htmlFor='bedroom'>Quarto</label>
              <select
                name='bedroom'
                id='bedroom'
                onChange={onBlurCep}
                value={form.bedroom}
              >
                <option value='0'>Selecione a quantidade</option>
                {qtdBedroom.map((bedroom) => (
                  <option key={bedroom} value={bedroom}>
                    {bedroom}
                  </option>
                ))}
              </select>
            </div>
            <div className='field'>
              <label htmlFor='bathroom'>Banheiro</label>
              <select
                name='bathroom'
                id='bathroom'
                onChange={onBlurCep}
                value={form.bathroom}
              >
                <option value='0'>Selecione a quantidade</option>
                {qtdBathroom.map((bathroom) => (
                  <option key={bathroom} value={bathroom}>
                    {bathroom}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <button type='submit'>Cadastrar imóvel</button>
      </form>
    </div>
  );
};

export default NewPost;

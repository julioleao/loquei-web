import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

import './styles.css';
import logo from '../../assets/logo.svg';
import Axios from 'axios';

const CadastrarImovel = () => {
  const [position, setPosition] = useState(null);
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    addName: '',
  });
  const [form, setForm] = useState({
    street: '',
    neighborhood: '',
    city: '0',
    uf: '0',
  });
  const qtdBedroom = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const qtdBathroom = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
    if (cep.length === 0) {
      setForm({ ...form, [name]: value });
      return;
    } else if (cep?.length !== 8) {
      return;
    }

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
      <header>
        <img src={logo} alt='Loquei' />
        <Link to='/'>
          <FiArrowLeft />
          Voltar
        </Link>
      </header>

      <form>
        <h1>Cadastrar novo imóvel</h1>

        <fieldset>
          <legend>
            <h2>Dados para contato</h2>
          </legend>
        </fieldset>

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

        <fieldset>
          <legend>
            <h2>Local do imóvel</h2>
          </legend>
        </fieldset>

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

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço abaixo</span>
          </legend>
          <MapContainer
            center={position ? position : [-25.4723154, -49.2808289]}
            zoom={16}
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
        </fieldset>

        <div className='field-group'>
          <div className='field'>
            <label htmlFor='quarto'>Quarto</label>
            <select name='quarto' id='quarto'>
              <option value='0'>Selecione a quantidade</option>
              {qtdBedroom.map((bedroom) => (
                <option key={bedroom} value={bedroom}>
                  {bedroom}
                </option>
              ))}
            </select>
          </div>
          <div className='field'>
            <label htmlFor='banheiro'>Banheiro</label>
            <select name='banheiro' id='banheiro'>
              <option value='0'>Selecione a quantidade</option>
              {qtdBathroom.map((bathroom) => (
                <option key={bathroom} value={bathroom}>
                  {bathroom}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type='submit'>Cadastrar imóvel</button>
      </form>
    </div>
  );
};

export default CadastrarImovel;
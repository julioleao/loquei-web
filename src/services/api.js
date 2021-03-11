import axios from 'axios';
import consts from '../consts';

const api = axios.create({
  baseURL: consts.API_URL,
});

export default api;

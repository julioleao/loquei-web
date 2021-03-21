import axios from 'axios';
import api from '../../../services/api';
import { addPost, addPosts, getCep } from '../../ducks/post';

export const searchCep = (cep) => {
    return (dispatch) => {
        axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
            .then((res) => {
                const { street, neighborhood, city, uf } = res.data;
                console.log(res.data);
                dispatch(getCep(res.data));
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

};
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { addPost, addPosts, getCep } from '../../ducks/post';
import { toastProps } from '../userActions';

export const searchCep = (cep) => {
    return (dispatch) => {
        axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
            .then((res) => {
                const { street, neighborhood, city, uf } = res.data;
                console.log(res.data);
                dispatch(getCep(res.data));
            })
            .catch((e) => {
                const { message } = e.response.data;
                toast.error(message, toastProps);
                console.log(message);
            });
    };

};

export const newPost = (post) => {
    return (dispatch) => {
        api
            .post('/create', post, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {

                dispatch(addPost(res.data));
                toast.success('Cadastro realizado com sucesso', toastProps);
                //window.location.reload();
            })
            .catch((e) => {
                const { error } = e.response.data;

                //console.log(e.response.data);
                e.response.data.errors.forEach((e) => toast.error(e, toastProps));
            });
    };

};
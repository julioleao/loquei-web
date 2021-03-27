import axios from 'axios';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { loaded, loading, success } from '../../ducks/loader';
import { addPost, addPosts, getCep } from '../../ducks/post';
import { toastProps } from '../userActions';

const RouteChange = () => {
    const history = useHistory();
    let path = `/list`;
    history.push(path);
};

export const searchCep = (cep) => (dispatch) => {

    dispatch(loading());
    axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        .then((res) => {
            const { street, neighborhood, city, uf } = res.data;

            dispatch(getCep(res.data));
            dispatch(loaded());
        })
        .catch((e) => {

            const { message } = e.response.data;
            dispatch(loaded());
            toast.error(message, toastProps);

        });
};


export const listPost = () => {
    return (dispatch) => {
        api.get('/list')
            .then((res) => {
                dispatch(addPosts(res.data));

            })
            .catch((e) => {
                e.response.data.errors.forEach((e) => toast.error(e, toastProps));
            });
    };
};

export const newPost = (post) => (dispatch) => {
    dispatch(loading());
    api
        .post('/create', post, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            const { post } = res.data;

            //dispatch(addPost());
            //toast.success('Cadastro realizado com sucesso', toastProps);
            //window.location.reload();

            toast.success('Cadastro realizado com sucesso', toastProps);

            setTimeout(() => {
                window.location.pathname = '/list';
                dispatch(loaded());
            }, [2000]);

        })
        .catch((e) => {
            //if (e.response.data)
            dispatch(loaded());

            e.response.data.errors.forEach((e) => toast.error(e, toastProps));
        });

};
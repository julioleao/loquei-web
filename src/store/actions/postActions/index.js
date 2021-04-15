import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { getCep } from '../../ducks/getCep';
import { cepFounded, cepFounding, loaded, loading } from '../../ducks/loader';
import { addPost, addPosts } from '../../ducks/post';
import { getPost } from '../../ducks/postDetail';
import { postsByUser, toastProps } from '../userActions';

export const searchCep = (cep) => (dispatch) => {

    dispatch(cepFounding());
    axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        .then((res) => {
            dispatch(getCep(res.data));
            dispatch(cepFounded());
        })
        .catch((e) => {
            const { message } = e.response.data;
            dispatch(cepFounded());
            toast.error(message, toastProps);

        });
};


export const listPost = () => (dispatch) => {
    dispatch(loading());
    api.get('/list')
        .then((res) => {

            dispatch(addPosts(res.data));
            dispatch(loaded());

        })
        .catch((e) => {
            dispatch(loaded());
            e.response.data.errors.forEach((e) => toast.error(e, toastProps));
        });
};

export const postDetail = (id) => (dispatch) => {
    dispatch(loading());
    api.get(`/${id}`)
        .then((res) => {
            dispatch(getPost(res.data));
            dispatch(loaded());
        })
        .catch((e) => {
            dispatch(loaded());
            e.response.data.errors.forEach((e) => toast.error(e, toastProps));
        });
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
            dispatch(addPost());
            toast.success(res.data.message, toastProps);

            setTimeout(() => {
                window.location.pathname = '/list';
                dispatch(loaded());
            }, [2000]);

        })
        .catch((e) => {
            dispatch(loaded());
            e.response.data.errors.forEach((e) => toast.error(e, toastProps));
        });

};

export const editPost = (post) => (dispatch) => {
    dispatch(loading());
    api
        .put('/edit', post, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            dispatch(addPost());
            toast.success(res.data.message, toastProps);
            dispatch(postsByUser());
            dispatch(loaded());
        })
        .catch((e) => {
            dispatch(loaded());
            e.response.data.errors.forEach((e) => toast.error(e, toastProps));
        });

};
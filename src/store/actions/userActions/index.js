import api from '../../../services/api';
import { login, register } from '../../ducks/auth';
import { toast } from 'react-toastify';
import { loaded, loading } from '../../ducks/loader';
import { profile } from '../../ducks/profile';

export const toastProps = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const authLogin = (user) => (dispatch) => {
    api
        .post('/login', user)
        .then((res) => {
            const { token } = res.data;
            const { name, email, _id } = res.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('userId', _id);
            dispatch(login(res.data));

            toast.success('Login realizado com sucesso', toastProps);

        })
        .catch((e) => {
            e.response.data.errors.forEach((e) => toast.error(e, toastProps));
        });
};


export const forgotPassword = (email) => (dispatch) => {
    dispatch(loading());
    api.post('/forgotPassword', email)
        .then((res) => {
            toast.success(res.data.message, toastProps);
            dispatch(loaded());
        })
        .catch((e) => {
            e.response.data.errors.forEach((e) => toast.error(e, toastProps));
            dispatch(loaded());
        });
};


export const resetPassword = (user) => (dispatch) => {
    dispatch(loading());
    api.post('/resetPassword', user)
        .then((res) => {
            dispatch(authLogin(user));
            toast.success(res.data.message, toastProps);
            dispatch(loaded());

        })
        .catch((e) => {
            e.response.data.errors.forEach((e) => toast.error(e, toastProps));
            dispatch(loaded());
        });
};


export const postsByUser = () => (dispatch) => {
    const id = { userId: localStorage.getItem('userId') };
    dispatch(loading());
    api.post('/profile/posts', id, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then((res) => {
        dispatch(profile(res.data));
        dispatch(loaded());
    }).catch((e) => {
        dispatch(loaded());
        e.response.data.errors.forEach((e) => toast.error(e, toastProps));
    });

};

export const detelePost = (postId) => (dispatch) => {
    dispatch(loading());
    api.delete('/profile/posts/delete', {
        data: {
            postId
        },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

    }).then((res) => {
        dispatch(postsByUser());
        dispatch(loaded());
        toast.success(res.data.message, toastProps);
    }).catch((e) => {
        dispatch(loaded());
        e.response.data.errors.forEach((e) => toast.error(e, toastProps));
    });
};

export const authRegister = (user) => (dispatch) => {
    api
        .post('/register', user)
        .then((res) => {
            const { token } = res.data;
            const { name, email, _id } = res.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('userId', _id);
            dispatch(register(res.data));
            toast.success('Cadastro realizado com sucesso', toastProps);
        })
        .catch((e) => {
            e.response.data.errors.forEach((e) => toast.error(e, toastProps));
        });
};

import api from '../../../services/api';
import { login, register } from '../../ducks/auth';
import { toast } from 'react-toastify';

const toastProps = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const authLogin = (user) => {
    return (dispatch) => {
        api
            .post('/login', user)
            .then((res) => {
                const { token } = res.data;
                const { name, email } = res.data.user;
                localStorage.setItem('token', token);
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
                //console.log(res.data.user);
                dispatch(login(res.data));

                /* res.data.isAuthenticated
                    ? (window.location.pathname = '/newPost')
                    : (window.location.pathname = '/list'); */

                toast.success('Login realizado com sucesso', toastProps);

            })
            .catch((e) => {
                const { error } = e.response.data;
                //notification('error', error);
                e.response.data.errors.forEach((e) => toast.error(e, toastProps));

                //console.log(error);
                //dispatch(addMessage(e.response.data.error));
            });
    };
};

export const authRegister = (user) => {
    return (dispatch) => {
        api
            .post('/register', user)
            .then((res) => {
                const { token } = res.data;
                const { name, email } = res.data.user;
                localStorage.setItem('token', token);
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
                dispatch(register(res.data));
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
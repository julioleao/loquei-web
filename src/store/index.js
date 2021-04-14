import { configureStore } from '@reduxjs/toolkit';

import auth from './ducks/auth';
import getCep from './ducks/getCep';
import loader from './ducks/loader';
import post from './ducks/post';
import postDetail from './ducks/postDetail';
import profile from './ducks/profile';

export default configureStore({
    reducer: {
        auth: auth,
        post: post,
        loading: loader,
        cep: getCep,
        detail: postDetail,
        profile,
    }
});
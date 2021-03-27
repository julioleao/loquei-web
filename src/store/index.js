import { configureStore } from '@reduxjs/toolkit';

import auth from './ducks/auth';
import loader from './ducks/loader';
import post from './ducks/post';

export default configureStore({
    reducer: {
        auth: auth,
        post: post,
        loading: loader
    }
});
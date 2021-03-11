import { configureStore } from '@reduxjs/toolkit';

import authReducer from './ducks/auth';
import postReducer from './ducks/post';

export default configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
    }
});
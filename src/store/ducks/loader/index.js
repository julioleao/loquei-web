import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    loading: true,
    success: false,
};

export const loading = createAction('LOADING');
export const loaded = createAction('LOADED');
export const success = createAction('SUCCESS');

export default createReducer(INITIAL_STATE, {
    [loading.type]: (state, action) => ({ ...state, loading: true }),
    [loaded.type]: (state, action) => ({ ...state, loading: false }),
    [success.type]: (state, action) => ({ ...state, success: true }),
});
import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    loading: false,
    loadCep: false,
    success: true,
};

export const loading = createAction('LOADING');
export const loaded = createAction('LOADED');
export const success = createAction('SUCCESS');
export const cepFounding = createAction('FOUNDING');
export const cepFounded = createAction('FOUNDED');

export default createReducer(INITIAL_STATE, {
    [loading.type]: (state, action) => ({ ...state, loading: true }),
    [loaded.type]: (state, action) => ({ ...state, loading: false }),
    [cepFounding.type]: (state, action) => ({ ...state, loadCep: true }),
    [cepFounded.type]: (state, action) => ({ ...state, loadCep: false }),
    [success.type]: (state, action) => ({ ...state, success: true }),
});
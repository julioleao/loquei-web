import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {};

export const getCep = createAction('GET_CEP');

export default createReducer(INITIAL_STATE, {
    [getCep.type]: (state, action) => ({ ...state, postLocation: action.payload })
});
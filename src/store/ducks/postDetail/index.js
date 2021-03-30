import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {};

export const getPost = createAction('GET_POST');

export default createReducer(INITIAL_STATE, {

    [getPost.type]: (state, action) => ({ ...action.payload }),
});
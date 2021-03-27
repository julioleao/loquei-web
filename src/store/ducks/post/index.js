import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = [];

export const addPost = createAction('ADD_POST');
export const addPosts = createAction('ADD_POSTS');
export const getCep = createAction('GET_CEP');

export default createReducer(INITIAL_STATE, {
    [addPost.type]: (state, action) => ({ ...state, post: action.payload }),
    [addPosts.type]: (state, action) => [...action.payload],
    [getCep.type]: (state, action) => ({ ...state, postLocation: action.payload })
});
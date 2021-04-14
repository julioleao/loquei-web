import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = [];

export const profile = createAction('PROFILE');

export default createReducer(INITIAL_STATE, {

    [profile.type]: (state, action) => [...action.payload],
});
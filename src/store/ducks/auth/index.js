import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    isAuthenticated: localStorage.getItem('token'),
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
};

export const login = createAction('LOGIN');
export const register = createAction('REGISTER');
export const logout = createAction('LOGOUT');

export default createReducer(INITIAL_STATE, {
    [login.type]: (state, action) => ({
        ...state,
        user: action.payload,
        isAuthenticated: localStorage.getItem('token'),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email')
    }),
    [logout.type]: (state, action) => ({
        ...state,
        isAuthenticated: false
    }),
    [register.type]: (state, action) => ({
        ...state,
        user: action.payload,
        isAuthenticated: localStorage.getItem('token'),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email')
    })
});
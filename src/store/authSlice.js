import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {isAuthenticated: false, token: null, email: null}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        isAuth(state){
            state.isAuthenticated = true;
            state.token = localStorage.getItem('token')
            state.email = localStorage.getItem('email')
        },
        notAuth(state){
            state.isAuthenticated = false;
        },
        login(state, action) {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.email = action.payload.email
            localStorage.setItem('token', state.token);
            localStorage.setItem('email', state.email);

        },
        logout(state) {
            state.isAuthenticated = false
            state.token = null
            state.email = null
            localStorage.removeItem('token');
            localStorage.removeItem('email');
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;
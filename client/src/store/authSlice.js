import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        // O (state, action), pero de la siguiente manera se define la payload
        setCredentials: (state, {payload: {email, token}}) => {
            state.user = email
            state.token = token
        }
    }
})

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
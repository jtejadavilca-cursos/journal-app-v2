import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "checking", // "checking" | "authenticated" | "not-authenticated"
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = "authenticated";
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = "not-authenticated";
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCrendentials: (state) => {
            state.status = "checking";
        },
        wrongCredentials: (state, { payload }) => {
            state.status = "not-authenticated";
            state.errorMessage = payload;
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
        },
    },
});
export const { login, logout, checkingCrendentials, wrongCredentials } = authSlice.actions;

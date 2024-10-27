import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { journalSlice } from "./journal/journalSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        journal: journalSlice.reducer,
    },
    /* Para cuando sea necesario desactivar la comprobación de serialización de Redux Toolkit
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    */
});

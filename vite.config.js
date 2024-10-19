import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        "process.env": {
            REACT_APP_FIREBASE_API_KEY: "AIzaSyAOb7w0FKqi0A2FDlXPssl_Yg_qe1xJeQA",
            REACT_APP_FIREBASE_AUTH_DOMAIN: "finalapp-9ec11.firebaseapp.com",
            REACT_APP_FIREBASE_PROJECT_ID: "finalapp-9ec11",
            REACT_APP_FIREBASE_STORAGE_BUCKET: "finalapp-9ec11.appspot.com",
            REACT_APP_FIREBASE_MESSAGING_SENDER_ID: "171387902481",
            REACT_APP_FIREBASE_APP_ID: "finalapp-9ec11",
        },
    },
});

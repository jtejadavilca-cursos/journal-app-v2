import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const vars = import.meta.env;

const firebaseConfig = {
    apiKey: vars.VITE_FIREBASE_API_KEY,
    authDomain: vars.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: vars.VITE_FIREBASE_PROJECT_ID,
    storageBucket: vars.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: vars.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: vars.VITE_FIREBASE_APP_ID,
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
//https://https//testing-firebase-974bd.firebaseio.com/__/auth/handler?apiKey=AIzaSyAndDjuf884BA20OOY6b9SBa19z4kxgqjI&appName=%5BDEFAULT%5D&authType=signInViaPopup&redirectUrl=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Flogin&v=10.14.1&eventId=1537658089&providerId=google.com&scopes=profile

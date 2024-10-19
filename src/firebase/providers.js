import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(FirebaseAuth, googleProvider);
        /*const credentials = GoogleAuthProvider.credentialFromResult(response);
        console.log("signInWithGoogle", credentials);*/
        const { displayName, email, photoURL, uid } = response.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        };
    } catch (error) {
        console.error("signInWithGoogle", error);
        return {
            ok: false,
            errorMessage: error.message,
        };
    }
};

export const signInWithEmailPassword = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        console.log("signInWithEmailPassword", response);

        const { displayName, photoURL, uid, accessToken } = response.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
            accessToken,
        };
    } catch (error) {
        console.error("signInWithEmailPassword", error);
        return {
            ok: false,
            errorMessage: error.message,
        };
    }
};

export const registerUserWithEmailPassword = async (email, password, displayName) => {
    try {
        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, accessToken } = response.user;
        console.log("registerUserWithEmailPassword", response);
        await updateProfile(FirebaseAuth.currentUser, { displayName });
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
            accessToken,
        };
    } catch (error) {
        console.error("registerUserWithEmailPassword", error);
        return {
            ok: false,
            errorMessage: error.message,
        };
    }
};

export const logoutFirebase = async () => {
    try {
        await FirebaseAuth.signOut();
        return {
            ok: true,
        };
    } catch (error) {
        console.error("logoutFirebase", error);
        return {
            ok: false,
            errorMessage: error.message,
        };
    }
};

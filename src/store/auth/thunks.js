import {
    logoutFirebase,
    registerUserWithEmailPassword,
    signInWithEmailPassword,
    signInWithGoogle,
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCrendentials, login, logout, wrongCredentials } from "./authSlice";

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCrendentials());
    };
};

export const startGoogleAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCrendentials());

        const result = await signInWithGoogle();

        if (result.ok) {
            return dispatch(login(result));
        }

        handlingWrongCredentials(dispatch, result.errorMessage);
    };
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCrendentials());

        const { ok, errorMessage, uid, photoURL } = await registerUserWithEmailPassword(email, password, displayName);

        if (ok) {
            return dispatch(login({ uid, photoURL, displayName, email }));
        }

        handlingWrongCredentials(dispatch, errorMessage);
    };
};

export const startLoginWithEmailPassword = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCrendentials());

        const result = await signInWithEmailPassword(email, password);

        if (result.ok) {
            return dispatch(login(result));
        }

        handlingWrongCredentials(dispatch, "Invalid email or password");
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout());
        dispatch(clearNotesLogout());
    };
};

const handlingWrongCredentials = (dispatch, errorMessage) => {
    dispatch(logout({ errorMessage }));
    dispatch(wrongCredentials(errorMessage));

    setTimeout(() => {
        dispatch(wrongCredentials(null));
    }, 5000);
};

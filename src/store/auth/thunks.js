import {
    logoutFirebase,
    registerUserWithEmailPassword,
    signInWithEmailPassword,
    signInWithGoogle,
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCrendentials, login, logout, wrongCredentials } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        console.log("checkingAuthentication thunk", email, password);
        dispatch(checkingCrendentials());

        const result = await signInWithEmailPassword(email, password);

        if (result.ok) {
            return dispatch(login(result));
        }

        handlingWrongCredentials(dispatch, "Invalid email or password");
    };
};

export const startGoogleAuthentication = () => {
    return async (dispatch) => {
        console.log("startGoogleSignIn thunk");
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
        console.log("startCreatingUserWithEmailPassword thunk", email, password, displayName);
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
        console.log("checkingAuthentication thunk", email, password);
        dispatch(checkingCrendentials());
        //const { token } = await apiLogin(email, password);

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
    console.log("handlingWrongCredentials", errorMessage);
    dispatch(logout({ errorMessage }));
    console.log("after logout");
    dispatch(wrongCredentials(errorMessage));
    console.log("after wrongCredentials");

    setTimeout(() => {
        dispatch(wrongCredentials(null));
    }, 5000);
};

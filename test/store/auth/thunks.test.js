import {
    logoutFirebase,
    registerUserWithEmailPassword,
    signInWithEmailPassword,
    signInWithGoogle,
} from "../../../src/firebase/providers";
import {
    checkingAuthentication,
    startCreatingUserWithEmailPassword,
    startGoogleAuthentication,
    startLoginWithEmailPassword,
    startLogout,
} from "../../../src/store/auth/thunks";
import { demoRegister, demoUser } from "../../fixtures/authFixtures";
jest.mock("../../../src/firebase/providers", () => ({
    signInWithEmailPassword: jest.fn(),
    signInWithGoogle: jest.fn(),
    registerUserWithEmailPassword: jest.fn(),
    logoutFirebase: jest.fn(),
}));

describe("auth thunks", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    test("Should call checkingAuthentication thunk", async () => {
        // Arrange
        const dispatch = jest.fn();
        checkingAuthentication()(dispatch);

        // Assert
        expect(dispatch).toHaveBeenCalledWith({ payload: undefined, type: "auth/checkingCrendentials" });
        expect(dispatch).toHaveBeenCalledTimes(1);
    });

    test("Should call startGoogleAuthentication thunk - Login successful", async () => {
        const loginData = { ok: true, ...demoUser };
        // Arrange
        const dispatch = jest.fn();

        await signInWithGoogle.mockResolvedValue(loginData);

        // Act
        await startGoogleAuthentication()(dispatch);

        // Assert
        expect(dispatch).toHaveBeenCalledWith({ payload: undefined, type: "auth/checkingCrendentials" });
        expect(dispatch).toHaveBeenCalledWith({ payload: loginData, type: "auth/login" });
        expect(signInWithGoogle).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(2);
    });

    test("Should call startGoogleAuthentication thunk - Login error", async () => {
        const loginData = { ok: false, errorMessage: "Test error" };
        // Arrange
        const dispatch = jest.fn();

        await signInWithGoogle.mockResolvedValue(loginData);

        // Act
        await startGoogleAuthentication()(dispatch);

        // Assert
        expect(dispatch).toHaveBeenCalledWith({ payload: undefined, type: "auth/checkingCrendentials" });
        expect(dispatch).toHaveBeenCalledWith({ payload: { errorMessage: "Test error" }, type: "auth/logout" });
        expect(dispatch).toHaveBeenCalledWith({ payload: "Test error", type: "auth/wrongCredentials" });
        jest.runAllTimers();
        expect(dispatch).toHaveBeenCalledWith({ payload: null, type: "auth/wrongCredentials" });
        expect(signInWithGoogle).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(4);
    });

    test("Should call startCreatingUserWithEmailPassword thunk", async () => {
        // Arrange
        const dispatch = jest.fn();

        await registerUserWithEmailPassword.mockResolvedValue({ ok: true, ...demoUser });
        // Act
        await startCreatingUserWithEmailPassword(demoRegister)(dispatch);

        // Assert
        expect(dispatch).toHaveBeenCalledWith({ payload: undefined, type: "auth/checkingCrendentials" });
        expect(dispatch).toHaveBeenCalledWith({ payload: demoUser, type: "auth/login" });
        expect(registerUserWithEmailPassword).toHaveBeenCalledWith(
            demoRegister.email,
            demoRegister.password,
            demoRegister.displayName
        );
        expect(registerUserWithEmailPassword).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(2);
    });

    test("Should call startLoginWithEmailPassword thunk - Login successful", async () => {
        const loginData = { ok: true, ...demoUser };
        // Arrange
        const dispatch = jest.fn();

        await signInWithEmailPassword.mockResolvedValue(loginData);

        // Act
        await startLoginWithEmailPassword("test@gmail.com", "123456")(dispatch);

        // Assert
        expect(dispatch).toHaveBeenCalledWith({ payload: undefined, type: "auth/checkingCrendentials" });
        expect(dispatch).toHaveBeenCalledWith({ payload: loginData, type: "auth/login" });
        expect(signInWithEmailPassword).toHaveBeenCalledWith("test@gmail.com", "123456");
        expect(signInWithEmailPassword).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(2);
    });

    test("Should call startLoginWithEmailPassword thunk - Login error", async () => {
        const loginData = { ok: false };
        // Arrange
        const dispatch = jest.fn();

        await signInWithEmailPassword.mockResolvedValue(loginData);

        // Act
        await startLoginWithEmailPassword("test@gmail.com", "111")(dispatch);

        // Assert
        expect(dispatch).toHaveBeenCalledWith({ payload: undefined, type: "auth/checkingCrendentials" });
        expect(dispatch).toHaveBeenCalledWith({
            payload: { errorMessage: "Invalid email or password" },
            type: "auth/logout",
        });
        expect(dispatch).toHaveBeenCalledWith({ payload: "Invalid email or password", type: "auth/wrongCredentials" });
        jest.runAllTimers();
        expect(dispatch).toHaveBeenCalledWith({ payload: null, type: "auth/wrongCredentials" });
        expect(signInWithEmailPassword).toHaveBeenCalledWith("test@gmail.com", "111");
        expect(signInWithEmailPassword).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(4);
    });

    test("Should call statLogout thunk", async () => {
        // Arrange
        const dispatch = jest.fn();

        await logoutFirebase.mockResolvedValue();

        // Act
        await startLogout()(dispatch);

        // Assert
        expect(dispatch).toHaveBeenCalledWith({ payload: undefined, type: "auth/logout" });
        expect(dispatch).toHaveBeenCalledWith({ payload: undefined, type: "journal/clearNotesLogout" });
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(logoutFirebase).toHaveBeenCalledTimes(1);
    });
});

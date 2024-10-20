import { authSlice } from "../../../src/store/auth/authSlice";
import { demoUser, initialState } from "../../fixtures/authFixtures";

describe("authSlice", () => {
    it("should handle initial state", () => {
        const sliceName = authSlice.name;
        const state = authSlice.reducer(undefined, { type: "unknown" });
        const sliceInitialState = authSlice.getInitialState();

        expect(sliceName).toEqual("auth");
        expect(sliceInitialState).toEqual(initialState);
        expect(state).toEqual(initialState);
    });

    it("should handle login", () => {
        const state = authSlice.reducer(initialState, authSlice.actions.login(demoUser));
        expect(state).toEqual({
            ...initialState,
            status: "authenticated",
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });

    it("should handle logout", () => {
        const state = authSlice.reducer(initialState, authSlice.actions.logout({ errorMessage: "Error" }));
        expect(state).toEqual({
            ...initialState,
            status: "not-authenticated",
            errorMessage: "Error",
        });
    });

    it("should handle logout", () => {
        const state = authSlice.reducer(initialState, authSlice.actions.logout());
        expect(state).toEqual({
            ...initialState,
            errorMessage: undefined,
            status: "not-authenticated",
        });
    });

    it("should handle checkingCrendentials", () => {
        const state = authSlice.reducer(initialState, authSlice.actions.checkingCrendentials());
        expect(state).toEqual({
            ...initialState,
            status: "checking",
        });
    });

    it("should handle wrongCredentials", () => {
        const state = authSlice.reducer(initialState, authSlice.actions.wrongCredentials("Error"));
        expect(state).toEqual({
            ...initialState,
            status: "not-authenticated",
            errorMessage: "Error",
        });
    });
});

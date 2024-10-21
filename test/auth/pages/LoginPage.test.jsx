import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth/authSlice";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticated } from "../../fixtures/authFixtures";

const mockStartGoogleAuthentication = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();
jest.mock("../../../src/store/auth/thunks", () => ({
    startGoogleAuthentication: () => mockStartGoogleAuthentication,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword(email, password);
    },
}));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => (fn) => fn(),
    //useSelector: jest.fn()
}));

const testStore = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    preloadedState: {
        auth: notAuthenticated,
    },
});

describe("LoginPage testing", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    test("should render LoginPage", () => {
        render(
            <Provider store={testStore}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
    });

    test("Should call googleSignIn function", () => {
        render(
            <Provider store={testStore}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleButton = screen.getByRole("button", { name: "Google" });
        fireEvent.click(googleButton);

        expect(mockStartGoogleAuthentication).toHaveBeenCalled();
    });

    test("Submit should call login function", () => {
        render(
            <Provider store={testStore}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: "Login" });

        fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
        fireEvent.change(passwordInput, { target: { value: "123456" } });
        fireEvent.click(submitButton);

        //expect(useSelector)
        expect(mockStartLoginWithEmailPassword).toHaveBeenCalled();
    });
});

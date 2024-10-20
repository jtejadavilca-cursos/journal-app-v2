export const initialState = {
    status: "checking", // "checking" | "authenticated" | "not-authenticated"
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const authenticated = {
    status: "authenticated", // "checking" | "authenticated" | "not-authenticated"
    uid: "123456",
    email: "tes@gmail.com",
    displayName: "Demo user",
    photoURL: "https://test.com",
    errorMessage: null,
};

export const notAuthenticated = {
    status: "not-authenticated", // "checking" | "authenticated" | "not-authenticated"
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const demoUser = {
    uid: "123456",
    email: "test@gmail.com",
    displayName: "Demo user",
    photoURL: "https://test.com",
};

export const demoLogin = {
    email: "test@gmail.com",
    password: "123456",
};

export const demoRegister = {
    email: "test@gmail.com",
    password: "123456",
    displayName: "Demo user",
};

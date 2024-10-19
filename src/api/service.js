import axios from "axios";

export const journalApi = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiLogin = async (email, password) => {
    try {
        const response = await journalApi.post("/auth/login", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("apiLogin", error);
        return { token: null };
    }
};

export const apiRegister = async (email, password, displayName) => {
    try {
        const response = await journalApi.post("/auth/register", {
            email,
            password,
            displayName,
        });
        return response.data;
    } catch (error) {
        console.error("apiRegister", error);
        return { token: null };
    }
};

export const apiLoginGoogle = async (email, password) => {
    try {
        const response = await journalApi.post("/auth/google", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("apiLoginGoogle", error);
        return { token: null };
    }
};

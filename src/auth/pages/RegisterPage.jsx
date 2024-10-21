import React, { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { AuthLayout } from "../layout/AuthLayout";
import { Button, Link, TextField, Typography, Alert } from "@mui/material";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const formValidations = {
    displayName: [(value) => value.length > 2, "Name must be at least 3 characters"],
    email: [(value) => value.includes("@"), "Invalid email"],
    password: [(value) => value.length > 5, "Password must be at least 6 characters"],
    confirmPassword: [(value, { password }) => value === password, "Passwords do not match"],
};

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state) => state.auth);
    const isAuthenticating = useMemo(() => status === "checking", [status]);
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        formState,
        displayName,
        email,
        password,
        confirmPassword,
        onInputChange,
        isFormValid,
        displayNameValid,
        emailValid,
        passwordValid,
        confirmPasswordValid,
    } = useForm(formData, formValidations);

    const onRegister = (e) => {
        e.preventDefault();
        console.log("onRegister", displayName, email, password, confirmPassword);
        setFormSubmitted(true);
        if (!isFormValid) return;

        return dispatch(startCreatingUserWithEmailPassword(formState));
    };

    return (
        <AuthLayout title="Register" maxWidth={800}>
            <form onSubmit={onRegister} className="animate__animated animate__fadeIn">
                <Grid container>
                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <TextField
                            label="Nombre completo"
                            type="text"
                            placeholder="Nombre completo"
                            variant="outlined"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={formSubmitted && !!displayNameValid}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="user@email.com"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            error={formSubmitted && !!emailValid}
                            helperText={emailValid}
                        />
                    </Grid>

                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Password"
                            variant="outlined"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            error={formSubmitted && !!passwordValid}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <TextField
                            label="Confirm password"
                            type="password"
                            placeholder="Confirm password"
                            variant="outlined"
                            fullWidth
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onInputChange}
                            error={formSubmitted && !!confirmPasswordValid}
                            helperText={confirmPasswordValid}
                        />
                    </Grid>
                </Grid>

                {errorMessage && (
                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <Alert severity="error">{errorMessage}</Alert>
                    </Grid>
                )}

                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item="true" size={{ xs: 12 }}>
                        <Button variant="contained" type="submit" fullWidth disabled={isAuthenticating}>
                            Register
                        </Button>
                    </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="end">
                    <Grid item="true" size={6} sx={{ mt: 1 }}>
                        <Typography variant="body2" textAlign="right">
                            Don't have an account?{" "}
                            <Link component={RouterLink} color="inherit" to="/auth/login">
                                Login
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};

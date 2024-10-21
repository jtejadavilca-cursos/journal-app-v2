import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Alert, Button, Link, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startGoogleAuthentication, startLoginWithEmailPassword } from "../../store/auth/thunks";

const formData = {
    email: "",
    password: "",
};

const formValidations = {
    email: [(value) => value.includes("@"), "Invalid email"],
    password: [(value) => value.length > 5, "Password must be at least 6 characters"],
};

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector((state) => state.auth);
    const isAuthenticating = useMemo(() => status === "checking", [status]);
    const isAuthenticated = useMemo(() => status === "authenticated", [status]);
    const navigate = useNavigate();

    const { email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm(
        formData,
        formValidations
    );

    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const login = useCallback(() => {
        dispatch(startLoginWithEmailPassword(email, password));
    }, [email, password, dispatch]);

    const loginGoogle = useCallback(() => {
        dispatch(startGoogleAuthentication());
    }, [dispatch]);

    const onLogin = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        login();
    };

    const onGoogleLogin = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        console.log("onGoogleLogin");
        loginGoogle();
    };

    return (
        <AuthLayout title="Login" maxWidth={468}>
            <form onSubmit={onLogin} className="animate__animated animate__fadeIn">
                <Grid container>
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
                </Grid>

                {errorMessage && (
                    <Grid item="true" size={12} sx={{ mb: 2 }}>
                        <Alert severity="error">{errorMessage}</Alert>
                    </Grid>
                )}

                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item="true" size={{ xs: 12, md: 6 }}>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            onClick={onLogin}
                            disabled={isAuthenticating}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item="true" size={{ xs: 12, md: 6 }}>
                        <Button variant="contained" fullWidth onClick={onGoogleLogin} disabled={isAuthenticating}>
                            <Google />
                            <Typography sx={{ ml: 1 }}>Google</Typography>
                        </Button>
                    </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="end">
                    <Grid item="true" size={6} sx={{ mt: 1 }}>
                        <Typography variant="body2" textAlign="right">
                            Don't have an account?{" "}
                            <Link component={RouterLink} color="inherit" to="/auth/register">
                                Register
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};

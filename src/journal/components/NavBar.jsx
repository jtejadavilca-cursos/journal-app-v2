import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";

export const NavBar = ({ drawerWidth = 240 }) => {
    const dispatch = useDispatch();

    const doLogout = useCallback(() => {
        console.log("logout");
        dispatch(startLogout());
    }, []);

    const onLogout = (e) => {
        e.preventDefault();
        doLogout();
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton color="inherit" edge="start" sx={{ mr: 2, display: { sm: "none" } }}>
                    <MenuOutlined />
                </IconButton>

                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" noWrap component="div">
                        {" "}
                        JournalApp{" "}
                    </Typography>

                    <IconButton color="error" onClick={onLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

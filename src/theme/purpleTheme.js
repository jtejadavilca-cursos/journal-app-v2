import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette: {
        primary: {
            //main: "#9c27b0",
            main: "#262254",
        },
        secondary: {
            //main: "#ff4081",
            main: "#543884",
        },
        error: {
            main: red.A400,
        },
    },
});

/*const theme = createTheme({
    palette: {
        primary: {
            main: "#9c27b0",
        },
        secondary: {
            main: "#ff4081",
        },
    },
});
*/

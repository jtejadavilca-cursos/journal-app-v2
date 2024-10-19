import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const Loader = () => {
    const { isSaving } = useSelector((state) => state.journal);
    return (
        <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={isSaving}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

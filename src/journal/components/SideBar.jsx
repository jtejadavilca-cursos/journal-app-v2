import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { useSelector } from "react-redux";
import { SideBarItem } from "./";

export const SideBar = ({ drawerWidth }) => {
    const { displayName } = useSelector((state) => state.auth);
    const { notes } = useSelector((state) => state.journal);

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                {notes.length > 0 && (
                    <List>
                        {notes.map((note) => (
                            <SideBarItem key={note.id} {...note} />
                        ))}
                    </List>
                )}
            </Drawer>
        </Box>
    );
};

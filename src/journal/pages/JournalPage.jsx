import React from "react";
import { IconButton, Typography } from "@mui/material";
import { AddOutlined, MailOutline } from "@mui/icons-material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";
import { Loader } from "../components/Loader";

export const JournalPage = () => {
    const dispatch = useDispatch();
    const { active, isSaving } = useSelector((state) => state.journal);

    const addNewNote = () => {
        if (isSaving) return;
        dispatch(startNewNote());
    };

    return (
        <JournalLayout>
            {/* <Typography variant="h1">JournalPage</Typography> */}

            {active ? <NoteView /> : <NothingSelectedView />}

            <IconButton
                size="large"
                sx={{
                    color: "white",
                    backgroundColor: "error.main",
                    ":hover": { backgroundColor: "error.main", opacity: 0.8 },
                    position: "fixed",
                    right: 50,
                    bottom: 50,
                }}
                onClick={addNewNote}
                disabled={isSaving}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
            <Loader />
        </JournalLayout>
    );
};

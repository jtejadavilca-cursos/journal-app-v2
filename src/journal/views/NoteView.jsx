import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, setActiveNote } from "../../store/journal";

export const NoteView = () => {
    const dispatch = useDispatch();
    const { active: note } = useSelector((state) => state.journal);

    const { title, body, date, formState, onInputChange } = useForm(note);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    const dateString = useMemo(() => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }, [date]);

    const onSave = () => {
        dispatch(startSaveNote());
    };

    return (
        <Grid container direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">
                    {dateString}
                </Typography>
            </Grid>

            <Grid item>
                <Button
                    color="primary"
                    sx={{ padding: 2 }}
                    onClick={onSave}
                    disabled={title.trim() === "" && body.trim() === ""}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: "none", mb: 1 }}
                    value={title}
                    name="title"
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Qué pasó hoy?"
                    minRows={5}
                    value={body}
                    name="body"
                    onChange={onInputChange}
                />
            </Grid>

            {/* Image gallery */}
            <ImageGallery />
        </Grid>
    );
};

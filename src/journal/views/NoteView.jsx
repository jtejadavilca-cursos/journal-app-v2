import { SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef } from "react";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, setActiveNote, startUploading } from "../../store/journal";
import Swal from "sweetalert2";

export const NoteView = () => {
    const dispatch = useDispatch();
    const { active: note, savedMessage, isSaving } = useSelector((state) => state.journal);

    const { title, body, date, formState, onInputChange } = useForm(note);

    const dateString = useMemo(() => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (savedMessage && savedMessage.length > 0) {
            Swal.fire({
                title: "Guardado",
                text: savedMessage,
                icon: "success",
                confirmButtonText: "Ok",
            });
        }
    }, [savedMessage]);

    const onSave = () => {
        dispatch(startSaveNote());
    };

    const onFileInputChange = ({ target }) => {
        const files = target.files;
        if (files.length === 0) return;

        dispatch(startUploading(Array.from(files)));
    };

    const openInputFile = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    return (
        <Grid container direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">
                    {dateString}
                </Typography>
            </Grid>

            <Grid item>
                <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                />
                <IconButton
                    component="label"
                    htmlFor="file"
                    sx={{ padding: 2 }}
                    color="primary"
                    disabled={isSaving}
                    onClick={openInputFile}
                >
                    <UploadOutlined sx={{ fontSize: 30 }} />
                </IconButton>

                <Button
                    color="primary"
                    sx={{ padding: 2 }}
                    onClick={onSave}
                    disabled={isSaving || (title.trim() === "" && body.trim() === "")}
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

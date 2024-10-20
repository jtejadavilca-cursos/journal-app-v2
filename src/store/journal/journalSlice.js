import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
    name: "journal",
    initialState: {
        isSaving: false,
        savedMessage: "",
        notes: [],
        active: null,
        /*active: {
            id: null,
            date: null,
            title: "",
            body: "",
            imageUrls: [],
        },*/
    },
    reducers: {
        savingNewNote: (state, { payload }) => {
            state.isSaving = payload;
            if (payload) state.savedMessage = "";
        },
        setSaving: (state, { payload }) => {
            state.isSaving = payload;
            if (payload) state.savedMessage = "";
        },
        addNewEmptyNote: (state, { payload }) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state, { payload }) => {
            const activeNote = payload;
            state.active = activeNote;
            state.savedMessage = "";
        },
        setNotes: (state, { payload }) => {
            state.notes = payload;
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) => (note.id === action.payload.id ? action.payload : note));
            state.savedMessage = `Nota ${action.payload.title} actualizada correctamente!`;
        },
        setPhotosToActiveNote: (state, action) => {
            console.log("state.active", state.active);
            console.log("state.active.imageUrls", state.active.imageUrls);
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.active = null;
            state.isSaving = false;
            state.savedMessage = "";
            state.notes = [];
        },
        deleteNoteById: (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        },
    },
});

export const {
    addNewEmptyNote,
    clearNotesLogout,
    setPhotosToActiveNote,
    setSaving,
    savingNewNote,
    setActiveNote,
    setNotes,
    updateNote,
    deleteNoteById,
} = journalSlice.actions;

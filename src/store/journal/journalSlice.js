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
        },
        addNewEmptyNote: (state, { payload }) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state, { payload }) => {
            console.log("setActiveNote payload", payload);
            const activeNote = payload;
            state.active = activeNote;
        },
        setNotes: (state, { payload }) => {
            console.log("setNotes payload", payload);
            state.notes = payload;
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) => (note.id === action.payload.id ? action.payload : note));
        },
        deleteNoteById: (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        },
    },
});

export const { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, updateNote, deleteNoteById } =
    journalSlice.actions;

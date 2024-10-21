// create journalSlice test

import { journalSlice } from "../../../src/store/journal/journalSlice";
import { initialState } from "../../fixtures/journalFixtures";

describe("journalSlice", () => {
    it("should handle initial state", () => {
        const sliceName = journalSlice.name;
        const state = journalSlice.reducer(undefined, { type: "unknown" });
        const sliceInitialState = journalSlice.getInitialState();

        expect(sliceName).toEqual("journal");
        expect(sliceInitialState).toEqual(initialState);
        expect(state).toEqual(initialState);
    });

    it("should handle savingNewNote", () => {
        const state = journalSlice.reducer(initialState, journalSlice.actions.savingNewNote(true));
        expect(state).toEqual({
            ...initialState,
            isSaving: true,
            savedMessage: "",
        });
    });

    it("should handle setSaving", () => {
        const state = journalSlice.reducer(initialState, journalSlice.actions.setSaving(true));
        expect(state).toEqual({
            ...initialState,
            isSaving: true,
            savedMessage: "",
        });
    });

    it("should handle addNewEmptyNote", () => {
        const state = journalSlice.reducer(initialState, journalSlice.actions.addNewEmptyNote({ id: 1 }));
        expect(state).toEqual({
            ...initialState,
            notes: [{ id: 1 }],
            isSaving: false,
        });
    });

    it("should handle setActiveNote", () => {
        const state = journalSlice.reducer(initialState, journalSlice.actions.setActiveNote({ id: 1 }));
        expect(state).toEqual({
            ...initialState,
            active: { id: 1 },
            savedMessage: "",
        });
    });

    it("should handle setNotes", () => {
        const state = journalSlice.reducer(initialState, journalSlice.actions.setNotes([{ id: 1 }, { id: 2 }]));
        expect(state).toEqual({
            ...initialState,
            notes: [{ id: 1 }, { id: 2 }],
        });
    });

    it("should handle updateNote", () => {
        const state = journalSlice.reducer(
            {
                ...initialState,
                notes: [{ id: 1, title: "old title" }],
            },
            journalSlice.actions.updateNote({
                id: 1,
                title: "new title",
            })
        );
        expect(state).toEqual({
            ...initialState,
            notes: [{ id: 1, title: "new title" }],
            isSaving: false,
            savedMessage: "Nota new title actualizada correctamente!",
        });
    });

    it("should handle setPhotosToActiveNote", () => {
        const state = journalSlice.reducer(
            {
                ...initialState,
                active: { id: 1, imageUrls: [] },
            },
            journalSlice.actions.setPhotosToActiveNote(["url1", "url2"])
        );
        expect(state).toEqual({
            ...initialState,
            active: { id: 1, imageUrls: ["url1", "url2"] },
            isSaving: false,
        });
    });

    it("should handle clearNotesLogout", () => {
        const state = journalSlice.reducer(
            {
                ...initialState,
                active: { id: 1 },
                notes: [{ id: 1 }],
            },
            journalSlice.actions.clearNotesLogout()
        );
        expect(state).toEqual({
            ...initialState,
            active: null,
            isSaving: false,
            savedMessage: "",
            notes: [],
        });
    });

    it("should handle deleteNoteById", () => {
        const state = journalSlice.reducer(
            {
                ...initialState,
                active: { id: 1 },
                notes: [{ id: 1 }, { id: 2 }],
            },
            journalSlice.actions.deleteNoteById()
        );
        expect(state).toEqual({
            ...initialState,
            active: null,
            isSaving: false,
            notes: [{ id: 2 }],
        });
    });
});

import { FirebaseDB } from "../../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { loadNotes } from "../../helpers/loadNotes";
import {
    addNewEmptyNote,
    setPhotosToActiveNote,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} from "./journalSlice";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(savingNewNote(true));

            const { uid } = getState().auth;
            const newNote = {
                title: "",
                body: "",
                date: new Date().getTime(),
                imageUrls: [],
            };

            const docRef = doc(collection(FirebaseDB, `${uid}/journal/notes`));
            await setDoc(docRef, newNote);

            newNote.id = docRef.id;

            dispatch(addNewEmptyNote(newNote));
            dispatch(setActiveNote(newNote));
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().auth;

            const notes = await loadNotes(uid);

            dispatch(setNotes(notes));
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(setSaving(true));
            const { uid } = getState().auth;
            const { active: note } = getState().journal;

            const noteToFirestore = { ...note };
            delete noteToFirestore.id;

            const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
            await setDoc(docRef, noteToFirestore, { merge: true });

            dispatch(updateNote(note));
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const startUploading = (files = []) => {
    return async (dispatch, getState) => {
        console.log("files", files);
        dispatch(setSaving(true));

        const fileUploadPromises = files.map((file) => fileUpload(file));

        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));
        dispatch(setSaving(false));
    };
};

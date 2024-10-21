import { collection, doc, setDoc } from "firebase/firestore/lite";
import {
    startDeletingNote,
    startLoadingNotes,
    startNewNote,
    startSaveNote,
    startUploading,
} from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";
import { loadNotes } from "../../../src/helpers/loadNotes";

jest.mock("../../../src/firebase/config", () => ({
    FirebaseDB: {},
}));

jest.mock("firebase/firestore/lite", () => ({
    collection: jest.fn(),
    doc: jest.fn(),
    setDoc: jest.fn(),
    deleteDoc: jest.fn(),
}));

jest.mock("../../../src/helpers/loadNotes", () => ({
    loadNotes: jest.fn(() => Promise.resolve([{ id: 1, title: "test" }])),
}));

jest.mock("../../../src/helpers/fileUpload", () => ({
    fileUpload: jest.fn(() => "test.jpg"),
}));

describe("journal thunks", () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const fixedTime = 1609459200000; // 1 de enero de 2021 (en milisegundos)

    beforeAll(() => {
        const mockDate = new Date(fixedTime);
        global.Date = jest.fn(() => mockDate);
        global.Date.now = jest.fn(() => fixedTime); // También mockeamos Date.now()
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("startNewNote should create a new note", async () => {
        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
            imageUrls: [],
            id: 1,
        };
        getState.mockReturnValue({ auth: { uid: "123" } });
        collection.mockReturnValue({});
        doc.mockReturnValue({ id: 1 });

        await setDoc.mockResolvedValue();

        await startNewNote()(dispatch, getState);

        expect(Date.now()).toBe(fixedTime);
        expect(new Date().getTime()).toBe(fixedTime);

        expect(dispatch).toHaveBeenCalledWith({ payload: true, type: "journal/savingNewNote" });
        expect(dispatch).toHaveBeenCalledWith({ payload: newNote, type: "journal/addNewEmptyNote" });
        expect(dispatch).toHaveBeenCalledWith({ payload: newNote, type: "journal/setActiveNote" });
        expect(dispatch).toHaveBeenCalledTimes(3);
    });

    test("startNewNote should handle error", async () => {
        getState.mockReturnValue({ auth: { uid: "123" } });
        collection.mockReturnValue({});
        doc.mockReturnValue({ id: 1 });

        await setDoc.mockRejectedValue("Error");

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith({ payload: true, type: "journal/savingNewNote" });
        expect(dispatch).toHaveBeenCalledTimes(1);
    });

    test("startLoadingNotes should load notes", async () => {
        getState.mockReturnValue({ auth: { uid: "123" } });

        await startLoadingNotes()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith({ type: "journal/setNotes", payload: [{ id: 1, title: "test" }] });
        expect(dispatch).toHaveBeenCalledTimes(1);
    });

    test("startLoadingNotes should handle error", async () => {
        getState.mockReturnValue({ auth: { uid: "123" } });

        loadNotes.mockRejectedValue("Error");

        await startLoadingNotes()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    test("startSaveNote should save a note", async () => {
        getState.mockReturnValue({
            auth: { uid: "123" },
            journal: {
                active: { id: 1, title: "test" },
            },
        });

        await setDoc.mockResolvedValue();

        await startSaveNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith({ payload: true, type: "journal/setSaving" });
        expect(dispatch).toHaveBeenCalledWith({
            payload: { id: 1, title: "test" },
            type: "journal/updateNote",
        });
        expect(dispatch).toHaveBeenCalledTimes(2);
    });

    test("startSaveNote should handle error", async () => {
        getState.mockReturnValue({
            auth: { uid: "123" },
            journal: {
                active: { id: 1, title: "test" },
            },
        });

        await setDoc.mockRejectedValue("Error");

        await startSaveNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith({ payload: true, type: "journal/setSaving" });
        expect(dispatch).toHaveBeenCalledTimes(1);
    });

    test("startUploading should upload files", async () => {
        const files = [{ name: "test.jpg" }];

        await startUploading(files)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith({ payload: true, type: "journal/setSaving" });
        expect(dispatch).toHaveBeenCalledWith({ payload: ["test.jpg"], type: "journal/setPhotosToActiveNote" });
        expect(dispatch).toHaveBeenCalledTimes(2);
    });

    test("startDeletingNote should delete a note", async () => {
        getState.mockReturnValue({
            auth: { uid: "123" },
            journal: {
                active: { id: 1, title: "test" },
            },
        });

        await setDoc.mockResolvedValue();

        await startDeletingNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith({ payload: true, type: "journal/setSaving" });
        expect(dispatch).toHaveBeenCalledWith({
            payload: undefined,
            type: "journal/deleteNoteById",
        });
        expect(dispatch).toHaveBeenCalledTimes(2);
    });
});

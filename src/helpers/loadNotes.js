import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid) => {
    if (!uid) throw new Error("uid is required");

    const notesSnap = await getDocs(collection(FirebaseDB, `${uid}/journal/notes`));
    const notes = notesSnap.docs.map((note) => {
        return {
            id: note.id,
            ...note.data(),
        };
    });

    return notes;
};

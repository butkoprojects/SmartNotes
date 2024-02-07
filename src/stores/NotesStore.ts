import {Note} from "../infrastructure/Note";
import { create } from 'zustand';
import {Label} from "../infrastructure/Label";
import { NotesClient } from "../api/NotesClient";

export type NotesStore = {
    notes: Note[];
    activeNote: Note | undefined;
    openedNotes: Label[];
    push: (note: Note) => void;
    getById: (id: string) => Note | undefined;
    pushToOpenNotes: (label: Label) => void;
    removeFromOpenNotes: (id: string) => void;
    getOpenedNotes: () => Label[];
    updateNoteText: (noteId: string, newText: string) => void;
    synchWithServer: () => void;
    reloadOpenedNotes: () => void;
    setActiveNote: (book: Note) => void;
    getActiveNote: () => Note | undefined;
}

const noteApi = new NotesClient();

export const useNotesStore = create<NotesStore>((set, get) => ({
    notes: [],
    openedNotes: [],
    activeNote: undefined,
    push: (note) =>
        set((state) => ({
            notes: state.notes.map(n => n.noteId).includes(note.noteId)
                ? state.notes
                : [...state.notes, note],
        })),
    getById: (id) => get().notes.find(n => n.noteId === id),
    pushToOpenNotes: (label) =>
        set((state) => ({
            openedNotes: state.openedNotes.includes(label)
                ? state.openedNotes
                : [...state.openedNotes, label],
        })),
    removeFromOpenNotes: (id) => set((state) => ({
        openedNotes: state.openedNotes.filter(l => l.id !== id)
    })),
    getOpenedNotes: () => get().openedNotes,
    updateNoteText: (noteId, newText) => 
        set((state) => ({
            notes: state.notes.map(n => {
                if (n.noteId === noteId) {
                    n.text = newText;
                    n.needsSynchranization = true;
                    return n;
                } else {
                    return n;
                }
            })
        })),
    synchWithServer: () => {
        get().notes
            .filter(n => n.needsSynchranization)
            .forEach(n => {
                if (n.noteId) {
                    console.log("Sync: ", n.label)
                    noteApi.updateNote(n)
                        .then(() => n.needsSynchranization = false)
                }
            });
    },
    reloadOpenedNotes: () => {
        noteApi.getLabels()
            .then(res => set((state) => ({ openedNotes: res.data })))
    },
    setActiveNote: (note) => set(() => ({activeNote: note})),
    getActiveNote: () => get().activeNote,
}));
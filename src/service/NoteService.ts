import {useNotesStore} from "../stores/NotesStore";
import {NotesClient} from "../api/NotesClient";
import {Note} from "../infrastructure/Note";
import { useBooksStore } from "../stores/BooksStore";
import { useToast } from "@chakra-ui/react";

export class NoteService {

    store = useNotesStore();
    activeBookStored = useBooksStore(state => state.activeBook);
    toast = useToast();

    bookStore = useBooksStore();
    notesApi = new NotesClient();

    openNote = (id: string, label: string) => {
        const alreadyOpened = this.store.getOpenedNotes().find(n => n.id === id);
        console.log("alreadyOpened", alreadyOpened)
        if (id && label && alreadyOpened === undefined) {
            this.notesApi.updateNoteStatus(id, 'OPENED')
                .then(() => this.store.pushToOpenNotes({id: id, label: label}));
        }
    }

    closeNote = (id: string) => {
        if (id) {
            this.notesApi.updateNoteStatus(id, 'CLOSED')
                .then(() => this.store.removeFromOpenNotes(id))
        }
    }

    createUpdateNote = async (note: Note) => {
        this.notesApi.createUpdateNote(note)
            .then(() => {
                if (this.activeBookStored) {
                    this.bookStore.reloadBook();
                }
                this.toast({
                    title: 'Note created.',
                    status: 'success',
                    duration: 2000,
                    position: 'bottom-right',
                    isClosable: true
                })
            })
            .catch(() => {
                this.toast({
                    title: 'Failed.',
                    status: 'error',
                    duration: 2000,
                    position: 'bottom-right',
                    isClosable: true
                })
            })
    }

    deleteNote = async (noteId: string) => {
        this.notesApi.deleteNote(noteId)
            .then(() => {
                if (this.activeBookStored) {
                    this.bookStore.reloadBook();
                }
                this.toast({
                    title: 'Note deleted.',
                    status: 'success',
                    duration: 2000,
                    position: 'bottom-right',
                    isClosable: true
                })
                this.store.reloadOpenedNotes()
            })
            .catch(() => {
                this.toast({
                    title: 'Failed.',
                    status: 'error',
                    duration: 2000,
                    position: 'bottom-right',
                    isClosable: true
                })
            })
    }

    renameNote = async (noteId: string | undefined, noteName: string, onRenamed: () => void, onError: () => void) => {
        if (noteId) {
            this.notesApi.updateNoteName(noteId, noteName)
            .then(() => {
                if (this.activeBookStored) {
                    this.bookStore.reloadBook();
                }
                this.toast({
                    title: 'Note renamed.',
                    status: 'success',
                    duration: 2000,
                    position: 'bottom-right',
                    isClosable: true
                })
                this.store.reloadOpenedNotes()
                onRenamed()
            })
            .catch(() => {
                this.toast({
                    title: 'Failed.',
                    status: 'error',
                    duration: 2000,
                    position: 'bottom-right',
                    isClosable: true
                })
                onError()
            })
        }
    }

    selectNote = (noteId: string | undefined) => {
        if (noteId) {
            const note = this.store.getById(noteId);
            if (note) {
                this.store.setActiveNote(note)
            }
        }
    }
}
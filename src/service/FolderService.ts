import { useToast } from "@chakra-ui/react";
import { FolderClient } from "../api/FolderClient";
import { Folder } from "../infrastructure/Folder";
import { useBooksStore } from "../stores/BooksStore";
import { useNotesStore } from "../stores/NotesStore";

export class FolderService {

    store = useBooksStore();
    noteStore = useNotesStore();
    activeBookStored = useBooksStore(state => state.activeBook);
    toast = useToast();
    folderApi = new FolderClient();

    createFolder = async (parentId: string | undefined, label: string) => {
        if (parentId) {
            this.folderApi.createUpdateFolder({
                folderId: undefined,
                parentId: parentId,
                label: label
            }).then(() => {
                if (this.activeBookStored) {
                    this.store.reloadBook();
                }
                this.toast({
                    title: 'Folder created.',
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
    }

    renameFolder = async (folderId: string, newName: string) => {
        if (folderId) {
            this.folderApi.updateName(folderId, newName)
                .then(() => {
                    if (this.activeBookStored) {
                        this.store.reloadBook();
                    }
                    this.toast({
                        title: 'Folder renamed.',
                        status: 'success',
                        duration: 2000,
                        position: 'bottom-right',
                        isClosable: true
                    })
                })
                .catch(() => {
                    this.toast({
                        title: 'Failed',
                        status: 'error',
                        duration: 2000,
                        position: 'bottom-right',
                        isClosable: true
                    })
                })
        }
    }

    deleteFolder = async (folderId: string) => {
        if (folderId) {
            this.folderApi.delete(folderId)
                .then(() => {
                    if (this.activeBookStored) {
                        this.store.reloadBook();
                    }
                    this.toast({
                        title: 'Folder deleted.',
                        status: 'success',
                        duration: 2000,
                        position: 'bottom-right',
                        isClosable: true
                    })
                    this.noteStore.reloadOpenedNotes();
                })
                .catch(() => {
                    this.toast({
                        title: 'Failed',
                        status: 'error',
                        duration: 2000,
                        position: 'bottom-right',
                        isClosable: true
                    })
                })
        }
    }
}
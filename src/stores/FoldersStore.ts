import { Folder } from "../infrastructure/Folder"
import {create} from "zustand";

export type FoldersStore = {
    activeFolder: Folder | undefined;
    setActiveFolder: (folder: Folder) => void;
    getActiveFolder: () => Folder | undefined;
}

export const useFoldersStore = create<FoldersStore>((set, get) => ({
    activeFolder: undefined,
    setActiveFolder: (folder) => {
        set((state) => ({
            activeFolder: folder.folderId === state.activeFolder?.folderId ? undefined : folder
        }))
    },
    getActiveFolder: () => get().activeFolder
}));
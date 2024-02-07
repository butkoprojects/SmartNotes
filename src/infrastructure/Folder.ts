import {Note} from "./Note";

export type Folder = {
    folderId: string,
    parentId: string,
    label: string,
    folders: Folder[],
    notes: Note[]
}
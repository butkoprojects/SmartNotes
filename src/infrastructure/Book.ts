import {Note} from "./Note";
import {Folder} from "./Folder";

export type Book = {
    bookId?: string,
    label: string,
    folders: Folder[],
    notes: Note[]
}
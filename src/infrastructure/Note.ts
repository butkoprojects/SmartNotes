export type Note = {
    noteId?: string,
    label: string,
    text?: string,
    parentId?: string,
    needsSynchranization?: boolean,
    path?: Path[]
}

export type Path = {
    id: string,
    label: string,
    type: "NOTE" | "FOLDER" | "BOOK"
}
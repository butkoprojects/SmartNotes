import { BooksClient } from "../api/BooksClient";
import {Book} from "../infrastructure/Book";
import {create} from "zustand";

type BooksStore = {
    activeBook: Book | undefined;
    reloadState: number;
    setActiveBook: (book: Book) => void;
    getActiveBook: () => Book | undefined;
    reloadBook: () => void;
}

const bookClient = new BooksClient();
// todo create async load book from backend
export const useBooksStore = create<BooksStore>((set, get) => ({
    activeBook: undefined,
    reloadState: 0,
    setActiveBook: (book) => set(() => ({activeBook: book})),
    getActiveBook: () => get().activeBook,
    reloadBook: () => {
        if (get().activeBook) {
            bookClient.getBook(get().activeBook!.bookId!)
                .then(res => set((state) => ({ activeBook: res.data })))
        }
    }
}));
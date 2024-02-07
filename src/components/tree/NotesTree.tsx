import {Spinner} from "@chakra-ui/react";
import * as React from "react";
import {LoadedBook} from "./LoadedBook";
import {useBooksStore} from "../../stores/BooksStore";
import {useEffect} from "react";

export const NotesTreeWidget = () => {
    const activeBookStored = useBooksStore(state => state.activeBook);

    useEffect(() => {
        console.log('Book changed')
    }, [activeBookStored]);

    return activeBookStored
        ? <LoadedBook book={activeBookStored}/>
        : <Spinner/>
}

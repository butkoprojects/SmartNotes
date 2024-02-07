import { Box } from "@chakra-ui/react";
import { useNotesStore } from "../stores/NotesStore";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FiBook, FiFile, FiFolder } from "react-icons/fi";

export const Footer = () => {
    const activeNote = useNotesStore(state => state.activeNote);

    return <Box 
        display="flex"
        flexDir="row"
        fontSize={14}
        className="footer"
        minH="3vh" 
        h="3vh"
        pl={2}
    >
        <Box display="flex" flexDir="row" mt="2px">
        { activeNote 
            ? activeNote.path?.map((p, index) => (
                <>
                    <Box display="flex" flexDir="row" key={index}>
                        <Box display="flex" flexDir="row" mt="3px">
                            {index > 0 ? <ChevronRightIcon/> : <></>}
                            <Box w="4px"></Box>
                            {p.type === "BOOK" ? <FiBook/> : p.type === "FOLDER" ? <FiFolder/> : <FiFile/>}
                        </Box>
                        <Box w="2px"></Box>
                        {p.label}
                    </Box>
                    <Box w="4px"></Box>
                </>
            )) 
            : ""}
        </Box>
    </Box>
}

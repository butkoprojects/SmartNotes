import {Box, Button, GridItem, Icon, IconButton, Input, Select, Spacer, Spinner, useDisclosure, useToast} from "@chakra-ui/react";
import { EditIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { FiFilePlus } from "react-icons/fi";
import { FiFolderPlus } from "react-icons/fi";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import * as React from "react";
import {NotesTreeWidget} from "../components/tree/NotesTree";
import {useState} from "react";
import {useBooksStore} from "../stores/BooksStore";
import {NoteService} from "../service/NoteService";
import { Book } from "../infrastructure/Book";
import { Note } from "../infrastructure/Note";
import { Folder } from "../infrastructure/Folder";
import { FolderService } from "../service/FolderService";

export const SideBar = () => {
    const noteDisclosure = useDisclosure({id: "note"});
    const folderDisclosure = useDisclosure({id: "folder"});

    return <Box
        borderColor='inherit'
        resize='horizontal'
        overflow='auto'
        minWidth='200px'
        maxWidth='400px'
        className="sidebar"
    >
        <Box display='flex'
             flexDirection='column'
             textAlign='center'>
            <Box display='flex'
                 justifyContent='center'
                 alignItems='center'
                 height='42px'
                 gap='6px'
            >
                <IconButton
                    size="sm"
                    fontSize="md"
                    variant="ghost"
                    color="current"
                    onClick={noteDisclosure.onOpen}
                    icon={<Icon as={FiFilePlus}/>}
                    aria-label={`area label`}
                />
                <IconButton
                    size="sm"
                    fontSize="md"
                    variant="ghost"
                    color="current"
                    onClick={folderDisclosure.onOpen}
                    icon={<Icon as={FiFolderPlus}/>}
                    aria-label={`area label`}
                />
            </Box>

            <NotesTreeWidget />
            <CreateNoteModal onClose={noteDisclosure.onClose} isOpen={noteDisclosure.isOpen}/>
            <CreateFolderModal onClose={folderDisclosure.onClose} isOpen={folderDisclosure.isOpen}/>
        </Box>
    </Box>
}

const CreateNoteModal = ({onClose, isOpen}: {
    onClose: () => any,
    isOpen: boolean
}) => {
    const [noteName, setNoteName] = useState('')
    const handleChange = (event: any) => setNoteName(event.target.value)
    const noteService = new NoteService()
    const activeBookStored = useBooksStore(state => state.activeBook);

    const handleSave = () => {
        const note = {
            label: noteName,
            parentId: activeBookStored?.bookId
        } as Note;
            
        noteService.createUpdateNote(note)
        setNoteName('')
        onClose();
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={noteName}
                            onChange={handleChange}
                            placeholder='Name'
                            size='md'
                        />
                
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSave} disabled={activeBookStored === null}>
                            Create
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const CreateFolderModal = ({onClose, isOpen}: {
    onClose: () => any,
    isOpen: boolean
}) => {
    const [folderName, setFolderName] = useState('')
    const handleChange = (event: any) => setFolderName(event.target.value)
    const service = new FolderService()
    const activeBookStored = useBooksStore(state => state.activeBook);

    const handleSave = () => {
        if (activeBookStored) {
            service.createFolder(activeBookStored.bookId, folderName);
        }
        setFolderName('');
        onClose();
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Folder</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={folderName}
                            onChange={handleChange}
                            placeholder='Name'
                            size='md'
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSave} disabled={activeBookStored === null}>
                            Create
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

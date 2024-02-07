import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    ButtonGroup,
    Flex,
    Icon, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Spinner, useDisclosure, useEditableControls, useToast
} from "@chakra-ui/react";
import * as React from "react";
import { Book } from "../../infrastructure/Book";
import { Folder } from "../../infrastructure/Folder";
import {NoteService} from "../../service/NoteService";
import { FiFolder } from "react-icons/fi";
import { Text } from '@chakra-ui/react'
import { FiFile } from "react-icons/fi";
import { Note } from "../../infrastructure/Note";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'
import { FolderService } from "../../service/FolderService";
import { ApproveAlert } from "../ApproveAlert";


type LoadedBookProps = {
    book: Book | undefined
}

export const LoadedBook = ({book}: LoadedBookProps) => {
    const noteService = new NoteService();

    return <Accordion allowMultiple>
        { book?.folders.map(folder => createAccordionTree(folder, noteService)) }
        { book?.notes.map(note =>
            <NoteWidget key={note.noteId} note={note} noteService={noteService}/>
        )}
    </Accordion>
}

const createAccordionTree = (folder: Folder, noteService: NoteService) => {
    
    return (
        <AccordionItem key={folder.folderId} border='none' className="note-widget">
            <FolderButtonWidget folder={folder}/>
            <AccordionPanel>
                { folder.folders.map(f => createAccordionTree(f, noteService)) }
                { folder.notes.map(note => <NoteWidget key={note.noteId} note={note} noteService={noteService}/> )}
            </AccordionPanel>
        </AccordionItem>
    );
}

const FolderButtonWidget = ({folder}: {folder: Folder}) => {
    const [buttonVisibility, setButtonVisibility] = React.useState(false);
    const renameDisclosure = useDisclosure({id: "folder rename"});
    const createFolderDisclosure = useDisclosure({id: "folder create folder"});
    const createNoteDisclosure = useDisclosure({id: "folder create note"});
    const folderService = new FolderService();
    const noteService = new NoteService();

    const onRename = () => {
        renameDisclosure.onOpen();
        setButtonVisibility(false);
    }

    const onFolderCreate = () => {
        createFolderDisclosure.onOpen();
        setButtonVisibility(false);
    }

    const onNoteCreate = () => {
        createNoteDisclosure.onOpen();
        setButtonVisibility(false);
    }

    const onDelete = () => {
        folderService.deleteFolder(folder.folderId);
    }

    const handleRename = (newName: string) => {
        folderService.renameFolder(folder.folderId, newName);
        renameDisclosure.onClose();
    }

    const handleFolderCreate = (folderName: string) => {
        folderService.createFolder(folder.folderId, folderName);
        createFolderDisclosure.onClose();
    }

    const handleNoteCreate = (noteName: string) => {
        noteService.createUpdateNote({
            label: noteName,
            parentId: folder.folderId
        });
        createNoteDisclosure.onClose();
    }

    React.useEffect(() => {
        const handleClick = () => setButtonVisibility(false);
        window.addEventListener("click", handleClick);
        return () => {
          window.removeEventListener("click", handleClick);
        };
    }, []);

    return <AccordionButton onContextMenu={(e) => {e.preventDefault(); setButtonVisibility(true)}}>
        <AccordionIcon />
        <Box w='6px'/>
        <Box as="span" display='flex' flexDirection='row' textAlign='left'>
            <Icon as={FiFolder} mt='2px'/>
            <Spacer w='6px'/>
            <Text isTruncated fontSize='sm'>{ folder.label }</Text>
            <Spacer/>
            <EditMenu 
                onDelete={onDelete}
                onRename={onRename}
                onFolderCreate={onFolderCreate}
                onNoteCreate={onNoteCreate}
                isOpen={buttonVisibility} 
                isFolder/>
            <CreateRenameModal 
                onClose={renameDisclosure.onClose}
                isOpen={renameDisclosure.isOpen}
                handleName={handleRename}
                oldName={folder.label}
                header="Rename Folder"
                succesButtonName="Rename"
            />
            <CreateRenameModal 
                onClose={createFolderDisclosure.onClose}
                isOpen={createFolderDisclosure.isOpen}
                handleName={handleFolderCreate}
                oldName=""
                header="Create Folder"
                succesButtonName="Create"
            />
            <CreateRenameModal 
                onClose={createNoteDisclosure.onClose}
                isOpen={createNoteDisclosure.isOpen}
                handleName={handleNoteCreate}
                oldName=""
                header="Create Note"
                succesButtonName="Create"
            />
        </Box>
    </AccordionButton>
}

const NoteWidget = ({note, noteService}:{note: Note, noteService: NoteService}) => {
    const [buttonVisibility, setButtonVisibility] = React.useState(false);
    const noteDisclosure = useDisclosure({id: "note rename"});
    const service = new NoteService();

    const onRenameClicked = () => {
        noteDisclosure.onOpen();
        setButtonVisibility(false);
    }

    const onDeleteCkicked = () => {
        if (note.noteId) {
            service.deleteNote(note.noteId)
        }
    }

    const handleRename = (newName: string) => {
        service.renameNote(note.noteId, newName, () => {}, () => {});
        noteDisclosure.onClose();
    }

    React.useEffect(() => {
        const handleClick = () => setButtonVisibility(false);
        window.addEventListener("click", handleClick);
        return () => {
          window.removeEventListener("click", handleClick);
        };
    }, []);

    return <AccordionItem 
        display='flex'
        flexDirection='row'
        textAlign='left'
        h='40px'
        alignItems='center'
        pl='20px'
        border='none'
        onDoubleClick={() => noteService.openNote(note.noteId!, note.label)}
        className="note-widget"
        onContextMenu={(e) => {e.preventDefault(); setButtonVisibility(true)}}
    >
        <Icon as={FiFile} mb='2px' />
        <Box w='6px' />
        <Text isTruncated fontSize='sm'>{ note.label }</Text>
        <EditMenu 
            onDelete={onDeleteCkicked}
            onRename={onRenameClicked} 
            onFolderCreate={() => {}}
            onNoteCreate={() => {}}
            isOpen={buttonVisibility} 
            isFolder={false}/>
        <CreateRenameModal 
            onClose={noteDisclosure.onClose}
            isOpen={noteDisclosure.isOpen}
            handleName={handleRename}
            oldName={note.label}
            header="Rename Note"
            succesButtonName="Rename"
        />
    </AccordionItem>
}

const EditMenu = (
    {
        onRename,
        onDelete, 
        onFolderCreate,
        onNoteCreate,
        isOpen,
        isFolder
    }: {
        onRename: () => void, 
        onDelete: () => void, 
        onFolderCreate: () => void, 
        onNoteCreate: () => void, 
        isOpen: boolean
        isFolder: boolean
    }
) => {
    const deleteDisclosure = useDisclosure({id: "delete"});

    return <>
        <Menu isOpen={isOpen}>
            <MenuButton>
            </MenuButton>
            <MenuList>
                {isFolder ? <MenuItem onClick={e => {e.preventDefault(); onNoteCreate()}} closeOnSelect>Add Note</MenuItem> : <></>}
                {isFolder ? <MenuItem onClick={e => {e.preventDefault(); onFolderCreate()}} closeOnSelect>Add Folder</MenuItem> : <></>}
                <MenuItem onClick={e => {e.preventDefault(); onRename()}} closeOnSelect>Rename</MenuItem>
                <MenuItem onClick={e => {e.preventDefault(); deleteDisclosure.onOpen()}} closeOnSelect>Delete</MenuItem>
            </MenuList>
        </Menu>
        <ApproveAlert
            isOpen={deleteDisclosure.isOpen}
            onApprove={onDelete}
            onClose={deleteDisclosure.onClose}
            header={isFolder ? "Delete Folder" : "Delete Note"}
        />
    </>
}

type CreateRenameProps = {
    onClose: () => any,
    isOpen: boolean,
    handleName: (newName: string) => void,
    oldName: string,
    header: string,
    succesButtonName: string
}

const CreateRenameModal = ({onClose, isOpen, handleName, oldName, header, succesButtonName}: CreateRenameProps) => {
    const [newName, setNewName] = React.useState(oldName)
    const handleChange = (event: any) => setNewName(event.target.value)

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{header}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={newName}
                            onChange={handleChange}
                            placeholder='Name'
                            size='md'
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleName(newName)}>{succesButtonName}</Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


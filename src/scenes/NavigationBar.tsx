import {GridItem, Box, useColorModeValue, Spinner, Tooltip, useDisclosure, Input, Button, useToast, IconButton} from "@chakra-ui/react";
import * as React from "react";
import {useEffect, useState} from "react";
import {BooksClient} from "../api/BooksClient";
import { Book } from "../infrastructure/Book";
import {useBooksStore} from "../stores/BooksStore";
import { Label } from "../infrastructure/Label";
import { FiBook } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";
import { useQuery } from "react-query";
import { Text } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";

export const NavigationBar = () => {
    const backGroundColor = useColorModeValue("gray.100", "gray.700");
    const bookClient = new BooksClient();
    const [activeBookId, setActiveBookId] = useState<string>();
    const booksStore = useBooksStore();
    const toast = useToast();

    const { data, isLoading, status, refetch } = useQuery("books", () => bookClient.getBooks());

    useEffect(() => {
        if (activeBookId) {
            bookClient.getBook(activeBookId)
                .then(res => {
                    booksStore.setActiveBook(res.data);
                });
        }
    }, [activeBookId]);

    const onSelect = (bookId: string) => {
        setActiveBookId(bookId);
    }

    const onAdd = (book: Book) => {
        bookClient.createBook(book)
            .then(() => {
                refetch();
                toast({
                    title: 'Book created.',
                    status: 'success',
                    duration: 2000,
                    position: 'bottom-right',
                    isClosable: true
                })
            })
            .catch(() => {
                toast({
                    title: 'Failed.',
                    status: 'error',
                    duration: 2000,
                    position: 'bottom-right',
                    isClosable: true
                })
            })
    }

    return <Box
        className="navbar"
        borderColor='inherit'
        display='flex'
        flexDir='column'
    >
        {
            isLoading 
                ? <Spinner />
                : <>
                    <AddBookButton onAdd={onAdd}/>
                    { 
                        // @ts-ignore
                        <BooksStack 
                            bookLabels={data?.data}
                            selectActiveBook={onSelect}
                            activeBookId={activeBookId}
                        />
                    }
                </>
        }
    </Box>
}

const BooksStack = ({
    bookLabels, 
    selectActiveBook,
    activeBookId
}:{
    bookLabels: Book[],
    selectActiveBook: (id: string) => void,
    activeBookId: string | undefined
}) => {
    useEffect(() => {
        if (!activeBookId && bookLabels && bookLabels.length > 0) {
            selectActiveBook(bookLabels[0].bookId!)
        }
    }, [])
    
    if (bookLabels && bookLabels.length > 0) {
        return bookLabels.map((label) => <BookWidget 
            key={label.label}
            bookLabel={label.label}
            onClick={() => selectActiveBook(label.bookId!)}
            isActive={activeBookId == label.bookId}
        />)
    }
    return <></>
}

const BookWidget = (
    {
        bookLabel,
        onClick,
        isActive
    }: {
        bookLabel: string, 
        onClick: () => void,
        isActive: boolean
}) => {
    return <Tooltip hasArrow label={bookLabel}>
        <IconButton 
            m='6px'
            size='lg'
            variant="ghost"
            onClick={onClick} 
            aria-label={bookLabel}
            icon={isActive ? <FiBookOpen/> : <FiBook />} 
            isActive={isActive}
        />
    </Tooltip>
}

const AddBookButton = (
    {
        onAdd
    }: {
        onAdd: (book: Book) => void
    }
) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [bookName, setBookName] = useState('')
    const handleChange = (event: any) => setBookName(event.target.value)

    return <Box>
         <IconButton 
            m='6px'
            size='lg'
            variant="ghost"
            onClick={onOpen} 
            aria-label={'add'}
            icon={<AddIcon />} 
        />
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Book</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={bookName}
                            onChange={handleChange}
                            placeholder='Name'
                            size='md'
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                            colorScheme='blue'
                            mr={3} 
                            onClick={() => {
                                onAdd({label: bookName, folders: [], notes: []})
                                onClose()
                            }}
                            disabled={bookName !== '' }
                        >
                            Create
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    </Box>
}

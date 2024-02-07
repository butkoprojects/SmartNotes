import {Tabs, TabList, TabPanels, Tab, TabPanel, GridItem, Box, Icon, IconButton, TabIndicator} from '@chakra-ui/react'
import { SkeletonText } from '@chakra-ui/react'
import {useEffect, useState} from "react";
import {Note} from "../infrastructure/Note";
import {NotesClient} from "../api/NotesClient";
import {Label} from "../infrastructure/Label";
import {useNotesStore} from "../stores/NotesStore";
import * as React from "react";
import {FiX} from "react-icons/fi";
import { Text } from '@chakra-ui/react'
import {NoteService} from "../service/NoteService";
import TextEditor from '../components/editor/TextEditor';
import { EditorState } from 'lexical';

const editorStateMap: Map<string, EditorState> = new Map();

export const NotesTabs = () => {
    const client =  new NotesClient();
    const [note, setNote] = useState<Note>();
    const [tabIndex, setTabIndex] = useState(0);
    const notesStore = useNotesStore();
    const labels = useNotesStore((state) => state.openedNotes);
    const service = new NoteService();

    useEffect(() => {
        notesStore.reloadOpenedNotes();
    }, [])

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
          editorStateMap.forEach((entry, id) => updateNoteTextFromEditor(id))
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);

    useEffect(() => {
        if (labels) {
            const label = labels[tabIndex]
            if (note) {
                updateNoteTextFromEditor(note.noteId)
            }

            if (label) {
                const storeNote = notesStore.getById(label.id);

                if (storeNote) {
                    setNote(storeNote);
                    service.selectNote(label.id)
                } else {
                    setNote(undefined);
                    client.getNotes(label.id)
                        .then(res => {
                            setNote(res.data);
                            notesStore.push(res.data);
                            service.selectNote(label.id)
                        });
                }
            }
        }
    }, [tabIndex, labels])

    const onClose = (id: string) => {
        service.closeNote(id);
    }

    function updateNoteTextFromEditor(id: string | undefined) {
        if (id && editorStateMap.has(id)) {
            const editorState = editorStateMap.get(id);
            if (editorState) {
                notesStore.updateNoteText(id, JSON.stringify(editorState.toJSON()));
                notesStore.synchWithServer();
            }
        }
    }

    function saveState(state: EditorState) {
        if (note && note.noteId) {
            editorStateMap.set(note.noteId, state);
        }
    }

    return <Box width='100%' className="tab">
        {labels
            ? <Tabs
            isLazy
            isManual
            variant="unstyled"
            size='sm'
            pt='11px'
            onChange={(key) => setTabIndex(key)}
        >
            <TabList>
                {labels?.map(label => (
                    <Tab key={label.id} maxWidth='150px'>
                        <Text isTruncated fontSize='sm'>{label.label}</Text>
                        <CloseButton onClose={() => onClose(label.id)}/>
                    </Tab>
                ))}
            </TabList>
            <TabIndicator
                height="2px"
                bg="blue.600"
                borderRadius="1px"
            />
            <TabPanels>
                {labels?.map(label => (
                    <TabPanel key={label.id}>
                        {note?.noteId === label.id
                            ? <TextEditor 
                                initialEditorState={note?.text} 
                                saveState={saveState}
                                id={label.id}
                            />
                            : !note && <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                        }
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
            : <Box>Empty</Box>
        }
    </Box>
}

const CloseButton = ({onClose}:{onClose: () => void}) => {
    return <IconButton
        size="1em"
        isRound
        variant="ghost"
        ml='6px'
        icon = {<Icon as={FiX} />}
        aria-label='area label'
        onClick={(e) => {
            e.preventDefault();
            onClose();
        }}
    />
}
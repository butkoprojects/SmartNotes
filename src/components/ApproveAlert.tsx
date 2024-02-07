import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
  } from '@chakra-ui/react'
import React from "react"

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onApprove: () => void;
    header: string
    question?: string
}

export const ApproveAlert = (props: Props) => {
    const cancelRef = React.useRef()

    return (
        <>
            {
                <AlertDialog
                    isOpen={props.isOpen}
                    // @ts-ignore
                    leastDestructiveRef={cancelRef}
                    onClose={props.onClose}
                >
                    <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {props.header}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            { props.question ? props.question : "Are you sure? You can't undo this action afterwards."}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                        {
                            // @ts-ignore
                            <Button ref={cancelRef} onClick={props.onClose}>
                                Cancel
                            </Button>
                        }
                        <Button colorScheme='red' onClick={props.onApprove} ml={3}>
                            Approve
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            }
        </>
    )
}

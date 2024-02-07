import { useEffect } from "react";
import { useNotesStore } from "../stores/NotesStore";

export const NoteJob = () => {
    const notes = useNotesStore()

    useEffect(() => {
        // Define the function you want to execute
        const fetchData = () => {
          // Your code to be executed every 1 minute
          notes.synchWithServer();
        };
    
        // Call the function initially
        fetchData();
    
        // Set up the interval to execute the function every 1 minute (60,000 milliseconds)
        const intervalId = setInterval(fetchData, 5000);
    
        // Cleanup: Clear the interval when the component is unmounted
        return () => {
          clearInterval(intervalId);
        };
      }, []); 

    return null;
}
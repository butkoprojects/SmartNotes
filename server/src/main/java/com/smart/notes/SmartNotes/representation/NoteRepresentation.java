package com.smart.notes.SmartNotes.representation;

import java.util.List;

public record NoteRepresentation(
        String noteId,
        String label,
        String text,
        List<PathRepresentation> path
) {
}

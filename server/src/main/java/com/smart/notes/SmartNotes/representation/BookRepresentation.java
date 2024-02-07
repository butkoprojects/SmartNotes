package com.smart.notes.SmartNotes.representation;

import java.util.*;

public record BookRepresentation(
        String bookId,
    String label,
    List<FolderRepresentation> folders,
    List<NoteRepresentation> notes
) {
}

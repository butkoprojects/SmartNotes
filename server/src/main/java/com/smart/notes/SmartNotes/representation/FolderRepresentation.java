package com.smart.notes.SmartNotes.representation;

import java.util.*;

public record FolderRepresentation(
        String folderId,
        String parentId,
    String label,
    List<FolderRepresentation> folders,
    List<NoteRepresentation> notes
) {
}

package com.smart.notes.SmartNotes.controller.request;

import java.util.UUID;

public record CreateUpdateFolderRequest(
        String folderId,
        String parentId,
        String label
) {
}

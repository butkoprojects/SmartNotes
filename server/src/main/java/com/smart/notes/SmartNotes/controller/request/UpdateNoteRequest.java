package com.smart.notes.SmartNotes.controller.request;

import com.smart.notes.SmartNotes.entity.*;

import java.util.UUID;

public record UpdateNoteRequest(
        String noteId,
    String label,
    String text,
    NoteStatus status,
        String parentId
) { }

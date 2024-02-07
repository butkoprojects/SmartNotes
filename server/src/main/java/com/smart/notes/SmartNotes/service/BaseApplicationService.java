package com.smart.notes.SmartNotes.service;

import com.smart.notes.SmartNotes.entity.BookEntity;
import com.smart.notes.SmartNotes.entity.FolderEntity;
import com.smart.notes.SmartNotes.entity.NoteEntity;
import com.smart.notes.SmartNotes.representation.BookRepresentation;
import com.smart.notes.SmartNotes.representation.FolderRepresentation;
import com.smart.notes.SmartNotes.representation.NoteRepresentation;

import java.util.List;
import java.util.Optional;

public abstract class BaseApplicationService {

    public BookRepresentation entityToRepresentation(BookEntity entity) {
        return new BookRepresentation(
                entity.getBookId(),
                entity.getLabel(),
                Optional.ofNullable(entity.getFolderEntities()).orElse(List.of())
                        .stream().map(this::entityToRepresentation).toList(),
                Optional.ofNullable(entity.getNoteEntities()).orElse(List.of())
                        .stream().map(this::entityToRepresentation).toList()
        );
    }

    public FolderRepresentation entityToRepresentation(FolderEntity entity) {
        return new FolderRepresentation(
                entity.getFolderId(),
                entity.getParentId(),
                entity.getLabel(),
                Optional.ofNullable(entity.getFolderEntities()).orElse(List.of())
                        .stream()
                        .map(this::entityToRepresentation)
                        .toList(),
                Optional.ofNullable(entity.getNoteEntities()).orElse(List.of())
                        .stream().map(this::entityToRepresentation).toList()
        );
    }

    public NoteRepresentation entityToRepresentation(NoteEntity entity) {
        return new NoteRepresentation(
                entity.getNoteId(),
                entity.getLabel(),
                null,
                null
        );
    }
}

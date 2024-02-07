package com.smart.notes.SmartNotes.service;

import com.smart.notes.SmartNotes.controller.request.*;
import com.smart.notes.SmartNotes.entity.*;
import com.smart.notes.SmartNotes.repository.common.*;
import com.smart.notes.SmartNotes.representation.*;
import jakarta.transaction.*;
import java.util.*;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Component
public class NoteApplicationService {

    @Autowired
    private NotesRepository notesRepository;

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private BookRepository bookRepository;

    public List<LabelRepresentation> getOpenedNotes() {
        return notesRepository.findOpenedNoteLabels().stream()
            .map(note -> new LabelRepresentation(note.getNoteId(), note.getLabel()))
            .toList();
    }

    @Transactional
    public NoteRepresentation createNote(UpdateNoteRequest request) {
        // todo add normal mapper
        var noteToUpdate = new NoteEntity(request.label(), request.text());
        noteToUpdate.setNoteId(request.noteId());
        noteToUpdate.setParentId(request.parentId());

        if (Objects.nonNull(request.status())) {
            noteToUpdate.setStatus(request.status().getValue());
        }
        return entityToRepresentation(notesRepository.save(noteToUpdate));
    }

    @Transactional
    public NoteRepresentation updateNote(UpdateNoteRequest request) {
        var noteToUpdate = notesRepository.findById(request.noteId())
                .orElseThrow(() -> new IllegalArgumentException("No entity for id %s found".formatted(request.noteId())));
        if (!StringUtils.isEmpty(request.text())) {
            noteToUpdate.setText(request.text());
        }
        if (Objects.nonNull(request.status())) {
            noteToUpdate.setStatus(request.status().getValue());
        }
        return entityToRepresentation(notesRepository.save(noteToUpdate));
    }

    @Transactional
    public void updateNoteStatus(String id, NoteStatus status) {
        notesRepository.updateStatus(id, status.getValue());
    }

    @Transactional
    public void updateNoteName(String id, String newName) {
        notesRepository.updateName(id, newName);
    }

    @Transactional
    public void delete(String id) {
        notesRepository.deleteById(id);
    }

    public NoteRepresentation createNote(NoteRepresentation noteRepresentation) {
        return entityToRepresentation(
            notesRepository.save(entityFromRepresentation(noteRepresentation))
        );
    }

    public NoteRepresentation getNoteById(String id) {
        return entityToRepresentation(notesRepository.findById(id).orElseThrow());
    }

    private List<PathRepresentation> getPath(NoteEntity note) {
        Stack<PathRepresentation> stack = new Stack<>();
        var parentId = note.getParentId();
        stack.push(toPath(note));

        while(parentId != null) {
            var folder = folderRepository.findById(parentId);
            if (folder.isPresent()) {
                stack.push(toPath(folder.get()));
                parentId = folder.get().getParentId();
            } else {
                var book = bookRepository.findById(parentId);
                book.ifPresent(bookEntity -> stack.push(toPath(bookEntity)));
                parentId = null;
            }
        }
        var result = new ArrayList<PathRepresentation>();
        while (!stack.isEmpty()) {
            result.add(stack.pop());
        }
        return result;
    }

    private NoteEntity entityFromRepresentation(NoteRepresentation noteRepresentation) {
        return new NoteEntity(
            noteRepresentation.label(),
            noteRepresentation.text()
        );
    }

    private NoteRepresentation entityToRepresentation(NoteEntity entity) {
        return new NoteRepresentation(
                entity.getNoteId(),
                entity.getLabel(),
                entity.getText(),
                getPath(entity)
        );
    }

    private PathRepresentation toPath(NoteEntity note) {
        return new PathRepresentation(
            note.getNoteId(),
            note.getLabel(),
            PathType.NOTE
        );
    }
    private PathRepresentation toPath(FolderEntity folder) {
        return new PathRepresentation(
            folder.getFolderId(),
            folder.getLabel(),
            PathType.FOLDER
        );
    }
    private PathRepresentation toPath(BookEntity book) {
        return new PathRepresentation(
            book.getBookId(),
            book.getLabel(),
            PathType.BOOK
        );
    }
}

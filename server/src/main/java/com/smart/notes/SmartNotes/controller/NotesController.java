package com.smart.notes.SmartNotes.controller;

import com.smart.notes.SmartNotes.controller.request.*;
import com.smart.notes.SmartNotes.entity.*;
import com.smart.notes.SmartNotes.representation.*;
import com.smart.notes.SmartNotes.service.*;
import java.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("notes")
public class NotesController {

    @Autowired
    private NoteApplicationService noteApplicationService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/open", produces = "application/json")
    public List<LabelRepresentation> getOpenNotes() {
        return noteApplicationService.getOpenedNotes();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = "application/json")
    public NoteRepresentation getNote(@RequestParam String id) throws InterruptedException {
        Thread.sleep(2000);
        return noteApplicationService.getNoteById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(produces = "application/json")
    public NoteRepresentation createNote(@RequestBody UpdateNoteRequest request) {
        return noteApplicationService.createNote(request);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(produces = "application/json")
    public NoteRepresentation updateNote(@RequestBody UpdateNoteRequest request) {
        return noteApplicationService.updateNote(request);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path="/{id}/status/{status}", produces = "application/json")
    public void updateStatus(
        @PathVariable String id,
        @PathVariable NoteStatus status
    ) {
        noteApplicationService.updateNoteStatus(id, status);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path="/{id}/name/{name}")
    public void updateName(
            @PathVariable String id,
            @PathVariable String name
    ) {
        noteApplicationService.updateNoteName(id, name);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path="/{id}")
    public void deleteNote(
            @PathVariable String id
    ) {
        noteApplicationService.delete(id);
    }
}

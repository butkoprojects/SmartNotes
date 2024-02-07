package com.smart.notes.SmartNotes.controller;

import com.smart.notes.SmartNotes.controller.request.CreateUpdateBookRequest;
import com.smart.notes.SmartNotes.controller.request.CreateUpdateFolderRequest;
import com.smart.notes.SmartNotes.representation.BookRepresentation;
import com.smart.notes.SmartNotes.representation.FolderRepresentation;
import com.smart.notes.SmartNotes.representation.NoteRepresentation;
import com.smart.notes.SmartNotes.service.FolderApplicationService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("folders")
public class FolderController {

    @Autowired
    private FolderApplicationService folderApplicationService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/{id}", produces = "application/json")
    public List<FolderRepresentation> getFolders(@PathVariable String id) throws InterruptedException {
        return folderApplicationService.getFolders(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(produces = "application/json")
    public FolderRepresentation createFolder(@RequestBody CreateUpdateFolderRequest request) {
        return folderApplicationService.createFolder(request);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path="/{id}/name/{name}")
    public void updateName(
            @PathVariable String id,
            @PathVariable String name
    ) {
        folderApplicationService.updateFolderName(id, name);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path="/{id}")
    public void deleteFolder(
            @PathVariable String id
    ) {
        folderApplicationService.delete(id);
    }
}

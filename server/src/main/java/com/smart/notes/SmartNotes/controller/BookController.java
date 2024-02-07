package com.smart.notes.SmartNotes.controller;

import com.smart.notes.SmartNotes.controller.request.CreateUpdateBookRequest;
import com.smart.notes.SmartNotes.controller.request.UpdateNoteRequest;
import com.smart.notes.SmartNotes.representation.*;
import com.smart.notes.SmartNotes.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("books")
public class BookController {

    @Autowired
    private BookApplicationService bookApplicationService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/{bookId}", produces = "application/json")
    public BookRepresentation findBookById(@PathVariable String bookId) {
        return bookApplicationService.findBookById(bookId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = "application/json")
    public List<BookRepresentation> getBooks() {
        return bookApplicationService.findAllBookLabels();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(produces = "application/json")
    public BookRepresentation createBook(@RequestBody CreateUpdateBookRequest request) {
        return bookApplicationService.createBook(request);
    }
}

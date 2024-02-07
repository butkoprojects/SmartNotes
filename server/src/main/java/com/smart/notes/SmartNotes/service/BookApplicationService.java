package com.smart.notes.SmartNotes.service;

import com.smart.notes.SmartNotes.controller.request.CreateUpdateBookRequest;
import com.smart.notes.SmartNotes.entity.*;
import com.smart.notes.SmartNotes.repository.common.*;
import com.smart.notes.SmartNotes.representation.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.List;
import java.util.UUID;

@Component
public class BookApplicationService extends BaseApplicationService {

    @Autowired
    private BookRepository bookRepository;

    public BookRepresentation findBookById(String bookId) {
        return entityToRepresentation(bookRepository.findById(bookId).orElseThrow());
    }

    public List<BookRepresentation> findAllBookLabels() {
        return bookRepository.findAllLabels().stream()
                .map(label -> new BookRepresentation(label.getBookId(), label.getLabel(), List.of(), List.of()))
                .toList();
    }

    @Transactional
    public BookRepresentation createBook(CreateUpdateBookRequest request) {
        var book = new BookEntity();
        book.setLabel(request.label());
        return entityToRepresentation(bookRepository.save(book));
    }
}

package com.smart.notes.SmartNotes.repository.common;

import com.smart.notes.SmartNotes.entity.*;

import java.util.List;
import java.util.Optional;

public interface BookRepository {

    Iterable<BookEntity> findAll();

    Optional<BookEntity> findById(String bookId);

    List<BookLabelEntity> findAllLabels();

    BookEntity save(BookEntity bookEntity);
}

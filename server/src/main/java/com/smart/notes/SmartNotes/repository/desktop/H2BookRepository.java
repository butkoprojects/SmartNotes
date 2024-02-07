package com.smart.notes.SmartNotes.repository.desktop;

import com.smart.notes.SmartNotes.entity.*;
import com.smart.notes.SmartNotes.repository.common.*;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Profile({"desktop", "desktop-prod"})
public interface H2BookRepository extends CrudRepository<BookEntity, String>, BookRepository {

    @Query("SELECT bookId as bookId, label as label from BookEntity")
    List<BookLabelEntity> findAllLabels();
}

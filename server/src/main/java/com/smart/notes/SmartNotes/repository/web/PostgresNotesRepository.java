package com.smart.notes.SmartNotes.repository.web;

import com.smart.notes.SmartNotes.repository.common.*;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.*;

@Repository
@Profile("web")
public interface PostgresNotesRepository extends NotesRepository {
}

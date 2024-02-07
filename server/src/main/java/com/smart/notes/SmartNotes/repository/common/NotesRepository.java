package com.smart.notes.SmartNotes.repository.common;

import com.smart.notes.SmartNotes.entity.*;
import com.smart.notes.SmartNotes.representation.*;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface NotesRepository {

    List<NoteLabelEntity> findOpenedNoteLabels();

    Optional<NoteEntity> findById(String id);

    void updateStatus(String id, String status);

    void updateName(String id, String newName);

    NoteEntity save(NoteEntity noteEntity);

    void deleteById(String id);

    void deleteByParentIds(Set<String> ids);
}

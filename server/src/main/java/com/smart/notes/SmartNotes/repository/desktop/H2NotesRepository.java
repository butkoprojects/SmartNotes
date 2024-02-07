package com.smart.notes.SmartNotes.repository.desktop;

import com.smart.notes.SmartNotes.entity.*;
import com.smart.notes.SmartNotes.repository.common.*;
import java.util.*;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.*;
import org.springframework.data.repository.query.*;
import org.springframework.stereotype.Repository;

@Repository
@Profile({"desktop", "desktop-prod"})
public interface H2NotesRepository extends CrudRepository<NoteEntity, String>, NotesRepository {

    @Query("SELECT noteId as noteId, label as label from NoteEntity where status = 'opened'")
    List<NoteLabelEntity> findOpenedNoteLabels();

    @Modifying
    @Query("UPDATE NoteEntity n SET n.status = :status WHERE n.noteId = :noteId")
    void updateStatus(@Param("noteId") String noteId, @Param("status") String status);

    @Modifying
    @Query("UPDATE NoteEntity n SET n.label = :newName WHERE n.noteId = :noteId")
    void updateName(@Param("noteId") String noteId, @Param("newName") String newName);

    @Modifying
    @Query("DELETE NoteEntity WHERE parentId IN :ids")
    void deleteByParentIds(@Param("ids") Set<String> ids);
}

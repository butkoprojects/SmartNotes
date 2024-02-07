package com.smart.notes.SmartNotes.repository.desktop;

import com.smart.notes.SmartNotes.entity.*;
import com.smart.notes.SmartNotes.repository.common.FolderRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
@Profile({"desktop", "desktop-prod"})
public interface H2FolderRepository extends CrudRepository<FolderEntity, String>, FolderRepository {

    @Modifying
    @Query("UPDATE FolderEntity n SET n.label = :newName WHERE n.folderId = :id")
    void updateName(@Param("id") String id, @Param("newName") String newName);

    @Query(value = """
            WITH CHILD_IDS(FOLDER_ID) AS (
                SELECT ?1 as FOLDER_ID
                UNION ALL
                SELECT FOLDERS.FOLDER_ID FROM CHILD_IDS
                    JOIN FOLDERS ON CHILD_IDS.FOLDER_ID = FOLDERS.PARENT_ID
            )
            SELECT * FROM CHILD_IDS""", nativeQuery = true)
    Set<String> getAllChildIds(String id);

    @Modifying
    @Query("DELETE FolderEntity WHERE folderId IN :ids")
    void deleteByIds(@Param("ids") Set<String> ids);
}

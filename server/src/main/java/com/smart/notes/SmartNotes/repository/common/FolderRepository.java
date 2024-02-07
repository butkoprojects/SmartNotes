package com.smart.notes.SmartNotes.repository.common;

import com.smart.notes.SmartNotes.entity.FolderEntity;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface FolderRepository {

    List<FolderEntity> findAllByParentId(String parentId);

    FolderEntity save(FolderEntity entity);

    void updateName(String id, String newName);

    void deleteByIds(Set<String> ids);

    Set<String> getAllChildIds(String id);

    Optional<FolderEntity> findById(String id);
}

package com.smart.notes.SmartNotes.service;

import com.smart.notes.SmartNotes.controller.request.CreateUpdateFolderRequest;
import com.smart.notes.SmartNotes.entity.FolderEntity;
import com.smart.notes.SmartNotes.repository.common.FolderRepository;
import com.smart.notes.SmartNotes.repository.common.NotesRepository;
import com.smart.notes.SmartNotes.representation.FolderRepresentation;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FolderApplicationService extends BaseApplicationService {

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private NotesRepository notesRepository;

    public List<FolderRepresentation> getFolders(String bookId) {
        return folderRepository.findAllByParentId(bookId).stream()
                .map(this::entityToRepresentation)
                .toList();
    }

    @Transactional
    public FolderRepresentation createFolder(CreateUpdateFolderRequest request) {
        var entity = new FolderEntity();
        entity.setParentId(request.parentId());
        entity.setLabel(request.label());
        return entityToRepresentation(folderRepository.save(entity));
    }

    @Transactional
    public void updateFolderName(String id, String name) {
        folderRepository.updateName(id, name);
    }

    @Transactional
    public void delete(String id) {
        var childIds = folderRepository.getAllChildIds(id);
        folderRepository.deleteByIds(childIds);
        notesRepository.deleteByParentIds(childIds);
    }
}

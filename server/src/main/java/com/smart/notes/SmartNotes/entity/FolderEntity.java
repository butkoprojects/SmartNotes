package com.smart.notes.SmartNotes.entity;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "FOLDERS")
public class FolderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "folder_id")
    private String folderId;

    @Column
    private String label;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id")
    private List<NoteEntity> noteEntities;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id")
    private List<FolderEntity> folderEntities;

    @Column(name = "parent_id")
    private String parentId;

    public FolderEntity() {}

    public void setFolderId(String id) {
        this.folderId = id;
    }
    public String getFolderId() { return folderId; }

    public String getLabel() {
        return label;
    }
    public void setLabel(String label) {
        this.label = label;
    }

    public List<NoteEntity> getNoteEntities() {return noteEntities;}
    public void setNoteEntities(List<NoteEntity> noteEntities) {this.noteEntities = noteEntities;}

    public List<FolderEntity> getFolderEntities() {return folderEntities;}
    public void setFolderEntities(List<FolderEntity> folderEntities) {this.folderEntities = folderEntities;}

    public String getParentId() {return parentId;}
    public void setParentId(String parentId) {this.parentId = parentId;}
}

package com.smart.notes.SmartNotes.entity;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "BOOKS")
public class BookEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "book_id")
    private String bookId;

    @Column
    private String label;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id")
    private List<FolderEntity> folderEntities;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id")
    private List<NoteEntity> noteEntities;

    public BookEntity() {}

    public void setBookId(String id) {
        this.bookId = id;
    }
    public String getBookId() {return bookId;}

    public String getLabel() {
        return label;
    }
    public void setLabel(String label) {
        this.label = label;
    }

    public List<FolderEntity> getFolderEntities() { return folderEntities == null ? List.of() : folderEntities; }
    public void setFolderEntities(List<FolderEntity> folderEntities) { this.folderEntities = folderEntities; }

    public List<NoteEntity> getNoteEntities() {return noteEntities == null ? List.of() : noteEntities;}
    public void setNoteEntities(List<NoteEntity> noteEntities) {this.noteEntities = noteEntities;}
}

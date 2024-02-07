package com.smart.notes.SmartNotes.entity;

import jakarta.persistence.*;

import java.util.UUID;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Table(name = "NOTES")
public class NoteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "note_id")
    private String noteId;

    @Column
    private String label;

    @Lob
    @Basic(fetch = LAZY)
    @Column
    private String text;

    @Column
    private String status;

    @Column(name = "parent_id")
    private String parentId;

    public NoteEntity() {}
    public NoteEntity(
        String label,
        String text
    ) {
        this.label = label;
        this.text = text;
    }

    public void setNoteId(String id) {
        this.noteId = id;
    }
    public String getNoteId() {
        return noteId;
    }

    public String getLabel() {return label;}
    public void setLabel(String label) {this.label = label;}

    public String getText() {return text;}
    public void setText(String text) {this.text = text;}

    public String getStatus() {return status;}
    public void setStatus(String status) {this.status = status;}

    public String getParentId() {return parentId;}
    public void setParentId(String parentId) {this.parentId = parentId;}
}

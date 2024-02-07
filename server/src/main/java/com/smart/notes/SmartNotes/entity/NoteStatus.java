package com.smart.notes.SmartNotes.entity;

public enum NoteStatus {
    OPENED("opened"),
    CLOSED("closed");

    private final String value;

    NoteStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

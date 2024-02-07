package com.smart.notes.SmartNotes.controller.request;

public record CreateUpdateBookRequest(
        long bookId,
        String label
) {
}

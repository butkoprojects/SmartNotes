package com.smart.notes.SmartNotes.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("health")
public class HealthCheck {

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = "application/json")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok("ALIVE");
    }
}

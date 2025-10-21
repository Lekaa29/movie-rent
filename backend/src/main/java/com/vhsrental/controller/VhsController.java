package com.vhsrental.controller;

import com.vhsrental.dto.VhsCreateRequest;
import com.vhsrental.dto.VhsDTO;
import com.vhsrental.dto.VhsFilterDto;
import com.vhsrental.service.VhsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vhs")
@RequiredArgsConstructor
public class VhsController {

    private final VhsService vhsService;

    @GetMapping
    public ResponseEntity<List<VhsDTO>> getAllVhs() {
        return ResponseEntity.ok(vhsService.getAllVhs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VhsDTO> getVhsById(@PathVariable Long id) {
        return ResponseEntity.ok(vhsService.getVhsById(id));
    }

    @GetMapping("/available")
    public ResponseEntity<List<VhsDTO>> getAvailableVhs() {
        return ResponseEntity.ok(vhsService.getAvailableVhs());
    }

    @PostMapping("/filter")
    public ResponseEntity<List<VhsDTO>> getFilterVhs(@Valid @RequestBody VhsFilterDto request) {
        return ResponseEntity.ok(vhsService.filterVhs(request));
    }


    @GetMapping("/search")
    public ResponseEntity<List<VhsDTO>> searchVhs(@RequestParam String title) {
        return ResponseEntity.ok(vhsService.searchVhsByTitle(title));
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<VhsDTO>> getVhsByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(vhsService.getVhsByGenre(genre));
    }

    @GetMapping("/genres")
    public ResponseEntity<List<String>> getAllGenres() {
        return ResponseEntity.ok(vhsService.getAllGenres());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VhsDTO> createVhs(@Valid @RequestBody VhsCreateRequest request) {
        return ResponseEntity.ok(vhsService.createVhs(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VhsDTO> updateVhs(@PathVariable Long id,
                                            @Valid @RequestBody VhsCreateRequest request) {
        return ResponseEntity.ok(vhsService.updateVhs(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteVhs(@PathVariable Long id) {
        vhsService.deleteVhs(id);
        return ResponseEntity.noContent().build();
    }
}
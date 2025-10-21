package com.vhsrental.controller;

import com.vhsrental.dto.RentDTO;
import com.vhsrental.dto.RentRequest;
import com.vhsrental.service.RentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rentals")
@RequiredArgsConstructor
public class RentController {

    private final RentService rentService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<RentDTO> rentVhs(@Valid @RequestBody RentRequest request,
                                           Authentication authentication) {
        return ResponseEntity.ok(rentService.rentVhs(authentication.getName(), request));
    }

    @PutMapping("/{id}/return")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<RentDTO> returnVhs(@PathVariable Long id) {
        return ResponseEntity.ok(rentService.returnVhs(id));
    }

    @GetMapping("/my-rentals")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<RentDTO>> getMyRentals(Authentication authentication) {
        return ResponseEntity.ok(rentService.getUserRentals(authentication.getName()));
    }

    @GetMapping("/my-rentals/active")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<RentDTO>> getMyActiveRentals(Authentication authentication) {
        return ResponseEntity.ok(rentService.getActiveRentals(authentication.getName()));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<RentDTO>> getAllRentals() {
        return ResponseEntity.ok(rentService.getAllRentals());
    }
}
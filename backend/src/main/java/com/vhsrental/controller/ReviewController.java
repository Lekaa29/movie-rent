package com.vhsrental.controller;

import com.vhsrental.dto.ReviewDTO;
import com.vhsrental.dto.ReviewRequest;
import com.vhsrental.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewDTO> createReview(@Valid @RequestBody ReviewRequest request,
                                                  Authentication authentication) {
        return ResponseEntity.ok(reviewService.createReview(authentication.getName(), request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewDTO> updateReview(@PathVariable Long id,
                                                  @Valid @RequestBody ReviewRequest request,
                                                  Authentication authentication) {
        return ResponseEntity.ok(reviewService.updateReview(id, authentication.getName(), request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id,
                                             Authentication authentication) {
        reviewService.deleteReview(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/vhs/{vhsId}")
    public ResponseEntity<List<ReviewDTO>> getVhsReviews(@PathVariable Long vhsId) {
        return ResponseEntity.ok(reviewService.getVhsReviews(vhsId));
    }

    @GetMapping("/my-reviews")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ReviewDTO>> getMyReviews(Authentication authentication) {
        return ResponseEntity.ok(reviewService.getUserReviews(authentication.getName()));
    }
}
package com.vhsrental.service;

import com.vhsrental.dto.ReviewDTO;
import com.vhsrental.dto.ReviewRequest;
import com.vhsrental.entity.Review;
import com.vhsrental.entity.User;
import com.vhsrental.entity.Vhs;
import com.vhsrental.repository.ReviewRepository;
import com.vhsrental.repository.UserRepository;
import com.vhsrental.repository.VhsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final VhsRepository vhsRepository;

    @Transactional
    public ReviewDTO createReview(String username, ReviewRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vhs vhs = vhsRepository.findById(request.getVhsId())
                .orElseThrow(() -> new RuntimeException("VHS not found"));

        if (reviewRepository.findByUserIdAndVhsId(user.getId(), vhs.getId()).isPresent()) {
            throw new RuntimeException("You have already reviewed this VHS");
        }

        Review review = Review.builder()
                .user(user)
                .vhs(vhs)
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        return convertToDTO(reviewRepository.save(review));
    }

    @Transactional
    public ReviewDTO updateReview(Long id, String username, ReviewRequest request) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized to update this review");
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment());

        return convertToDTO(reviewRepository.save(review));
    }

    public void deleteReview(Long id, String username) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized to delete this review");
        }

        reviewRepository.delete(review);
    }

    public List<ReviewDTO> getVhsReviews(Long vhsId) {
        return reviewRepository.findByVhsId(vhsId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ReviewDTO> getUserReviews(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return reviewRepository.findByUserId(user.getId()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ReviewDTO convertToDTO(Review review) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(review.getId());
        dto.setUserId(review.getUser().getId());
        dto.setUsername(review.getUser().getUsername());
        dto.setVhsId(review.getVhs().getId());
        dto.setVhsTitle(review.getVhs().getTitle());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}
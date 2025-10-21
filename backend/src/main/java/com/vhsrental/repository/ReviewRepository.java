package com.vhsrental.repository;

import com.vhsrental.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByVhsId(Long vhsId);
    List<Review> findByUserId(Long userId);
    Optional<Review> findByUserIdAndVhsId(Long userId, Long vhsId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.vhs.id = :vhsId")
    Double getAverageRatingByVhsId(Long vhsId);
}
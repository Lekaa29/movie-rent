package com.vhsrental.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "vhs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vhs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 100)
    private String director;

    @Column(length = 50)
    private String genre;

    @Column(name = "release_year")
    private Integer releaseYear;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "available_copies", nullable = false)
    private Integer availableCopies = 0;

    @Column(name = "total_copies", nullable = false)
    private Integer totalCopies = 0;

    @Column(name = "daily_rental_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal dailyRentalPrice;

    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "vhs", cascade = CascadeType.ALL)
    @ToString.Exclude
    private Set<Rent> rents = new HashSet<>();

    @OneToMany(mappedBy = "vhs", cascade = CascadeType.ALL)
    @ToString.Exclude
    private Set<Review> reviews = new HashSet<>();
}
package com.vhsrental.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class VhsDTO {
    private Long id;
    private String title;
    private String director;
    private String genre;
    private Integer releaseYear;
    private String description;
    private Integer totalCopies;
    private BigDecimal dailyRentalPrice;
    private String coverImageUrl;
    private Double averageRating;
    private Integer reviewCount;
    private LocalDateTime createdAt;






}
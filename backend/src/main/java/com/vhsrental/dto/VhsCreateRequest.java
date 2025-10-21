package com.vhsrental.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class VhsCreateRequest {
    @NotBlank
    private String title;

    private String director;

    private String genre;

    private Integer releaseYear;

    private String description;

    @NotNull
    @Positive
    private Integer totalCopies;

    @NotNull
    @Positive
    private BigDecimal dailyRentalPrice;

    private String coverImageUrl;
}
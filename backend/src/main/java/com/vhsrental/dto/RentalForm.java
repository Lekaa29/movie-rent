package com.vhsrental.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RentalForm {

    @NotNull(message = "VHS ID is required")
    private Long vhsId;

    @NotNull(message = "Customer ID is required")
    private Long customerId;

    @NotNull(message = "Rental days are required")
    @Min(value = 1, message = "Rental days must be at least 1")
    @Max(value = 30, message = "Rental days cannot exceed 30")
    private Integer rentalDays;

    @NotNull(message = "Daily rental price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal dailyRentalPrice;
}

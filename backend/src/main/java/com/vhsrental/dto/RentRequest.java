package com.vhsrental.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class RentRequest {
    @NotNull
    private Long vhsId;

    @NotNull
    @Positive
    private Integer rentalDays;
}
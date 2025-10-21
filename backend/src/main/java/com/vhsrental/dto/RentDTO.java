package com.vhsrental.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class RentDTO {
    private Long id;
    private Long userId;
    private Long vhsId;

    private String username;
    private String vhsTitle;

    private LocalDateTime rentalDate;
    private LocalDateTime dueDate;
    private LocalDateTime returnDate;

    private String status;

    private BigDecimal totalPrice;
}
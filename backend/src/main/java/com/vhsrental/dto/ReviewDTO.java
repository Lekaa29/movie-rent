package com.vhsrental.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewDTO {
    private Long id;
    private Long userId;
    private String username;
    private Long vhsId;
    private String vhsTitle;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}
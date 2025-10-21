package com.vhsrental.dto;

import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Data
@Getter
public class VhsFilterDto {
    private Boolean available;
    private List<String> genres;
    private String search;
    private List<String> directors;
    private Integer releaseYearFrom;
    private Integer releaseYearTo;
    private BigDecimal priceMin;
    private BigDecimal priceMax;
}

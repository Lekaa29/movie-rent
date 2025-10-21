package com.vhsrental.service;

import com.vhsrental.dto.VhsCreateRequest;
import com.vhsrental.dto.VhsDTO;
import com.vhsrental.dto.VhsFilterDto;
import com.vhsrental.entity.Vhs;
import com.vhsrental.repository.ReviewRepository;
import com.vhsrental.repository.VhsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VhsService {

    private final VhsRepository vhsRepository;
    private final ReviewRepository reviewRepository;

    public List<VhsDTO> getAllVhs() {
        return vhsRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public VhsDTO getVhsById(Long id) {
        Vhs vhs = vhsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("VHS not found"));

        return convertToDTO(vhs);
    }

    public List<VhsDTO> getAvailableVhs() {
        return vhsRepository.findByTotalCopiesGreaterThan(0).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<VhsDTO> filterVhs(VhsFilterDto filter) {
        List<Vhs> allVhs = vhsRepository.findAll();

        return allVhs.stream()
                .filter(v -> filter.getAvailable() == null
                        || !filter.getAvailable()
                        || v.getTotalCopies() > 0)
                .filter(v -> filter.getGenres() == null
                        || filter.getGenres().isEmpty()
                        || filter.getGenres().contains(v.getGenre()))
                .filter(v -> filter.getSearch() == null
                        || filter.getSearch().isEmpty()
                        || v.getTitle().toLowerCase().contains(filter.getSearch().toLowerCase()))
                .filter(v -> filter.getDirectors() == null
                        || filter.getDirectors().isEmpty()
                        || filter.getDirectors().contains(v.getDirector()))
                .filter(v -> filter.getReleaseYearFrom() == null
                        || v.getReleaseYear() >= filter.getReleaseYearFrom())
                .filter(v -> filter.getReleaseYearTo() == null
                        || v.getReleaseYear() <= filter.getReleaseYearTo())
                .filter(v -> filter.getPriceMin() == null
                        || v.getDailyRentalPrice().compareTo(filter.getPriceMin()) >= 0)
                .filter(v -> filter.getPriceMax() == null
                        || v.getDailyRentalPrice().compareTo(filter.getPriceMax()) <= 0)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<VhsDTO> searchVhsByTitle(String title) {
        return vhsRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<VhsDTO> getVhsByGenre(String genre) {
        return vhsRepository.findByGenre(genre).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<String> getAllGenres() {
        return vhsRepository.findAllGenres();
    }

    @Transactional
    public VhsDTO createVhs(VhsCreateRequest request) {
        Vhs vhs = Vhs.builder()
                .title(request.getTitle())
                .director(request.getDirector())
                .genre(request.getGenre())
                .releaseYear(request.getReleaseYear())
                .description(request.getDescription())
                .totalCopies(request.getTotalCopies())
                .dailyRentalPrice(request.getDailyRentalPrice())
                .coverImageUrl(request.getCoverImageUrl())
                .build();

        return convertToDTO(vhsRepository.save(vhs));
    }

    @Transactional
    public VhsDTO updateVhs(Long id, VhsCreateRequest request) {
        Vhs vhs = vhsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("VHS not found"));

        vhs.setTitle(request.getTitle());
        vhs.setDirector(request.getDirector());
        vhs.setGenre(request.getGenre());
        vhs.setReleaseYear(request.getReleaseYear());
        vhs.setDescription(request.getDescription());
        vhs.setDailyRentalPrice(request.getDailyRentalPrice());
        vhs.setCoverImageUrl(request.getCoverImageUrl());

        return convertToDTO(vhsRepository.save(vhs));
    }

    public void deleteVhs(Long id) {
        vhsRepository.deleteById(id);
    }

    private VhsDTO convertToDTO(Vhs vhs) {
        VhsDTO dto = new VhsDTO();
        dto.setId(vhs.getId());
        dto.setTitle(vhs.getTitle());
        dto.setDirector(vhs.getDirector());
        dto.setGenre(vhs.getGenre());
        dto.setReleaseYear(vhs.getReleaseYear());
        dto.setDescription(vhs.getDescription());
        dto.setTotalCopies(vhs.getTotalCopies());
        dto.setDailyRentalPrice(vhs.getDailyRentalPrice());
        dto.setCoverImageUrl(vhs.getCoverImageUrl());
        dto.setCreatedAt(vhs.getCreatedAt());

        Double avgRating = reviewRepository.getAverageRatingByVhsId(vhs.getId());
        dto.setAverageRating(avgRating != null ? avgRating : 0.0);
        dto.setReviewCount(reviewRepository.findByVhsId(vhs.getId()).size());

        return dto;
    }
}

package com.vhsrental.service;

import com.vhsrental.dto.RentDTO;
import com.vhsrental.dto.RentRequest;
import com.vhsrental.entity.Rent;
import com.vhsrental.entity.User;
import com.vhsrental.entity.Vhs;
import com.vhsrental.repository.RentRepository;
import com.vhsrental.repository.UserRepository;
import com.vhsrental.repository.VhsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RentService {

    private final RentRepository rentRepository;
    private final VhsRepository vhsRepository;
    private final UserRepository userRepository;

    @Transactional
    public RentDTO rentVhs(String username, RentRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vhs vhs = vhsRepository.findById(request.getVhsId())
                .orElseThrow(() -> new RuntimeException("VHS not found"));


        BigDecimal totalPrice = vhs.getDailyRentalPrice()
                .multiply(BigDecimal.valueOf(request.getRentalDays()));

        Rent rent = Rent.builder()
                .user(user)
                .vhs(vhs)
                .dueDate(LocalDateTime.now().plusDays(request.getRentalDays()))
                .status("ACTIVE")
                .totalPrice(totalPrice)
                .build();

        vhsRepository.save(vhs);

        return convertToDTO(rentRepository.save(rent));
    }

    @Transactional
    public RentDTO returnVhs(Long rentId) {
        Rent rent = rentRepository.findById(rentId)
                .orElseThrow(() -> new RuntimeException("Rent not found"));

        if (!"ACTIVE".equals(rent.getStatus())) {
            throw new RuntimeException("Rent is not active");
        }

        rent.setReturnDate(LocalDateTime.now());
        rent.setStatus("RETURNED");

        Vhs vhs = rent.getVhs();
        vhsRepository.save(vhs);

        return convertToDTO(rentRepository.save(rent));
    }

    public List<RentDTO> getUserRentals(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return rentRepository.findByUserId(user.getId()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RentDTO> getActiveRentals(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return rentRepository.findByUserIdAndStatus(user.getId(), "ACTIVE").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<RentDTO> getAllRentals() {
        return rentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private RentDTO convertToDTO(Rent rent) {
        RentDTO dto = new RentDTO();
        dto.setId(rent.getId());
        dto.setUserId(rent.getUser().getId());
        dto.setUsername(rent.getUser().getUsername());
        dto.setVhsId(rent.getVhs().getId());
        dto.setVhsTitle(rent.getVhs().getTitle());
        dto.setRentalDate(rent.getRentalDate());
        dto.setDueDate(rent.getDueDate());
        dto.setReturnDate(rent.getReturnDate());
        dto.setStatus(rent.getStatus());
        dto.setTotalPrice(rent.getTotalPrice());
        return dto;
    }
}
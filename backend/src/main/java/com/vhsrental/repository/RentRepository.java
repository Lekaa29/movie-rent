package com.vhsrental.repository;

import com.vhsrental.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RentRepository extends JpaRepository<Rent, Long> {
    List<Rent> findByUserId(Long userId);
    List<Rent> findByVhsId(Long vhsId);
    List<Rent> findByStatus(String status);
    List<Rent> findByUserIdAndStatus(Long userId, String status);
}
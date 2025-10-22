package com.vhsrental.repository;

import com.vhsrental.entity.Rent;
import com.vhsrental.entity.User;
import com.vhsrental.entity.Vhs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RentRepository extends JpaRepository<Rent, Long> {
    List<Rent> findByUserId(Long userId);
    List<Rent> findByVhsId(Long vhsId);
    List<Rent> findByStatus(String status);
    Optional<Rent> findById(Long rentId);
    Optional<Rent> findByUserAndVhs(User user, Vhs vhs);

    List<Rent> findByUserIdAndStatus(Long userId, String status);
}
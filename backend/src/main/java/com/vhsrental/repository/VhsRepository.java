package com.vhsrental.repository;

import com.vhsrental.entity.Vhs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VhsRepository extends JpaRepository<Vhs, Long>, JpaSpecificationExecutor<Vhs>{
    List<Vhs> findByGenre(String genre);
    List<Vhs> findByTitleContainingIgnoreCase(String title);
    List<Vhs> findByTotalCopiesGreaterThan(Integer count);


    @Query("SELECT DISTINCT v.genre FROM Vhs v WHERE v.genre IS NOT NULL")
    List<String> findAllGenres();
}
package com.smakhov.dao;

import com.smakhov.entity.DocumentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentDao extends JpaRepository<DocumentEntity, String> {
    Page<DocumentEntity> findByIndexedFalse(Pageable pageable);
}

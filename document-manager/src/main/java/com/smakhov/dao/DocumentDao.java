package com.smakhov.dao;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.smakhov.entity.DocumentEntity;

@Repository
public interface DocumentDao extends ElasticsearchRepository<DocumentEntity, String> {
}

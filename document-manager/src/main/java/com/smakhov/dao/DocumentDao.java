package com.smakhov.dao;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.smakhov.entity.DocumentEntity;

@Repository
public interface DocumentDao extends ElasticsearchRepository<DocumentEntity, String> {
	
	@Query("{\"query\":{\"bool\":{\"should\": [{ \"match\": { \"title\": {\"query\": \"?0\", \"fuzziness\": \"AUTO\"}}}, { \"match\": { \"content\":{\"query\": \"?0\", \"fuzziness\": \"AUTO\"}}}]}}}")
    Page<DocumentEntity> findByTitle(String title, Pageable pageable);
}

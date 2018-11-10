package com.smakhov.dao.elasticsearch;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.smakhov.entity.ElasticsearchDocumentEntity;

@Repository
public interface ElasticsearchDocumentDao extends ElasticsearchRepository<ElasticsearchDocumentEntity, String> {
	
	@Query("{\"query\":{\"bool\":{\"should\": [{ \"match\": { \"title\": {\"query\": \"?0\", \"fuzziness\": \"AUTO\"}}}, { \"match\": { \"content\":{\"query\": \"?0\", \"fuzziness\": \"AUTO\"}}}]}}}")
    Page<ElasticsearchDocumentEntity> findByTitle(String title, Pageable pageable);
}

package com.smakhov;

import com.smakhov.dao.elasticsearch.ContentExtractor;
import com.smakhov.dao.elasticsearch.DocumentDao;
import com.smakhov.dao.elasticsearch.ElasticsearchDocumentDao;
import com.smakhov.entity.DocumentEntity;
import com.smakhov.entity.ElasticsearchDocumentEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DocumentIndexer implements ApplicationListener<ApplicationReadyEvent> {
    private static final Logger LOG = LoggerFactory.getLogger(DocumentIndexer.class);

    @Autowired
    private DocumentDao dao;

    @Autowired
    private ElasticsearchDocumentDao elasticsearchDocumentDao;

    @Autowired
    private ContentExtractor contentExtractor;

    @Override
    @Async
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        boolean hasNext = true;
        int page = 0;
        Page<DocumentEntity> notIndexed = dao.findByIndexedFalse(PageRequest.of(0, 500));
        hasNext = notIndexed.hasNext();
        while (hasNext) {

            List<ElasticsearchDocumentEntity> elasticSearchDocuments = notIndexed.getContent().parallelStream().map(documentEntity -> {

                String content = contentExtractor.extractContent(documentEntity.getDocUrl());
                documentEntity.setIndexed(true);
                return new ElasticsearchDocumentEntity(
                        documentEntity.getId(),
                        content,
                        documentEntity.getCourt() != null ? documentEntity.getCourt().getName() : null,
                        documentEntity.getJudge(),
                        documentEntity.getJusticeKind() != null ? documentEntity.getJusticeKind().getName() : null,
                        documentEntity.getCauseNumber(),
                        documentEntity.getCategory() != null ? documentEntity.getCategory().getName() : null,
                        documentEntity.getJudgment() != null ? documentEntity.getJudgment().getName() : null,
                        documentEntity.getAdjudicationDate(),
                        documentEntity.getReceiptDate());
            }).collect(Collectors.toList());
            LOG.info("Page {}, ={}", page, notIndexed);
            hasNext = notIndexed.hasNext();
            page++;
            elasticsearchDocumentDao.saveAll(elasticSearchDocuments);
            List<DocumentEntity> documents = notIndexed.getContent();
            documents.forEach(documentEntity -> documentEntity.setIndexed(true));
            dao.saveAll(documents);
            notIndexed = dao.findByIndexedFalse(PageRequest.of(0, 500));
        }
        LOG.info("Indexing complete");
    }

}

package com.smakhov;

import com.rtfparserkit.converter.text.StringTextConverter;
import com.rtfparserkit.parser.RtfStreamSource;
import com.smakhov.dao.elasticsearch.DocumentDao;
import com.smakhov.dao.elasticsearch.ElasticsearchDocumentDao;
import com.smakhov.entity.DocumentEntity;
import com.smakhov.entity.ElasticsearchDocumentEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class DocumentIndexer implements ApplicationListener<ApplicationReadyEvent> {
    private  static final Logger LOG = LoggerFactory.getLogger(DocumentIndexer.class);

    @Autowired
    private DocumentDao dao;

    @Autowired
    private ElasticsearchDocumentDao elasticsearchDocumentDao;

    @Override
    @Async
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        boolean hasNext = true;
        int page = 0;
        do {
            Page<DocumentEntity> notIndexed = dao.findByIndexedFalse(new PageRequest(page, 10));
            Page<ElasticsearchDocumentEntity> elasticSearchDocuments = notIndexed.map(documentEntity -> {

                String content = extractContent(documentEntity);
                return new ElasticsearchDocumentEntity(documentEntity.getId(), content);
            });
            LOG.info("Page {}, ={}", page, elasticSearchDocuments.getContent());
            hasNext = notIndexed.hasNext();
            page++;
            elasticsearchDocumentDao.save(elasticSearchDocuments);
            List<DocumentEntity> documents = notIndexed.getContent();
            documents.forEach(documentEntity -> documentEntity.setIndexed(true));
            dao.save(documents);
        } while(hasNext);

    }

    private String extractContent(DocumentEntity documentEntity) {
        if(documentEntity.getDocUrl() != null) {
            StringTextConverter converter = new StringTextConverter();
            try {
                converter.convert(new RtfStreamSource(new URL(documentEntity.getDocUrl()).openStream()));
            } catch (IOException e) {
                e.printStackTrace();
            }

            return converter.getText();
        }
        return "";
    }
}

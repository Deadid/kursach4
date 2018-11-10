package com.smakhov;

import com.smakhov.dao.elasticsearch.DocumentDao;
import com.smakhov.entity.DocumentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

@Component
public class DocumentIndexer implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private DocumentDao dao;
    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        Page<DocumentEntity> notIndexed = dao.findByIndexedFalse(new PageRequest(0, 10));
        System.out.println(notIndexed);

    }
}

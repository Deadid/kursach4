package com.smakhov.controller;

import com.smakhov.entity.ElasticsearchDocumentEntity;
import org.elasticsearch.search.sort.SortBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.aggregation.AggregatedPage;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

@RestController
@CrossOrigin(origins = "*")
public class SearchController {

  @Autowired
  private ElasticsearchTemplate template;

  @PostMapping("/search")
  public AggregatedPage<ElasticsearchDocumentEntity> search(@RequestParam("content")String contentToSearch, @RequestParam(required = false, name = "page") Integer page) {
    NativeSearchQuery searchQuery = new NativeSearchQueryBuilder().withFields("*").withQuery(
            queryStringQuery(contentToSearch).defaultField("content")).withSort(SortBuilders.scoreSort()).withSort(SortBuilders.fieldSort("id.keyword"))
            .withPageable(PageRequest.of(page != null ? page : 0, 20))
            .build();

    AggregatedPage<ElasticsearchDocumentEntity> content = template.queryForPage(searchQuery, ElasticsearchDocumentEntity.class);
    return content;
  }
}

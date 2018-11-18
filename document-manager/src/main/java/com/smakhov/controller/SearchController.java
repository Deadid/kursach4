package com.smakhov.controller;

import com.smakhov.entity.ElasticsearchDocumentEntity;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.filters.FiltersAggregationBuilder;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.aggregations.support.ValueType;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.sort.ScoreSortBuilder;
import org.elasticsearch.search.sort.SortBuilder;
import org.elasticsearch.search.sort.SortBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.aggregation.AggregatedPage;
import org.springframework.data.elasticsearch.core.aggregation.impl.AggregatedPageImpl;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

@RestController("/search")
@CrossOrigin(origins = "*")
public class SearchController {

  @Autowired
  private ElasticsearchTemplate template;

  @PostMapping
  public AggregatedPage<ElasticsearchDocumentEntity> search(@RequestParam("content")String contentToSearch, @RequestParam(required = false, name = "page") Integer page) {
    NativeSearchQuery searchQuery = new NativeSearchQueryBuilder().withFields("*").withQuery(
            queryStringQuery(contentToSearch).defaultField("content")).withSort(SortBuilders.scoreSort()).withSort(SortBuilders.fieldSort("id.keyword"))
            .withPageable(PageRequest.of(page != null? page : 0, 20))
            .build();

    AggregatedPage<ElasticsearchDocumentEntity> content = template.queryForPage(searchQuery, ElasticsearchDocumentEntity.class);
    return content;
  }
}

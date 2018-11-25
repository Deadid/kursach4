package com.smakhov.controller;

import com.smakhov.entity.ElasticsearchDocumentEntity;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.sort.SortBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.aggregation.AggregatedPage;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

@RestController
@CrossOrigin(origins = "*")
public class SearchController {

  @Autowired
  private ElasticsearchTemplate template;

  @PostMapping("/search")
  public AggregatedPage<ElasticsearchDocumentEntity> search(@RequestBody UISearchRequest searchRequest) {
    Integer page = searchRequest.getPage();
    NativeSearchQueryBuilder searchQuery = new NativeSearchQueryBuilder().withFields("*");
    if (searchRequest.getContent() != null) {
      searchQuery.
              withQuery(
                      queryStringQuery(searchRequest.getContent()).defaultField("content"));
    }
    if (searchRequest.hasAnyFilter()) {
      BoolQueryBuilder filter = buildFilters(searchRequest);
      searchQuery.withFilter(
              filter
      );

    }

    searchQuery
            .withPageable(PageRequest.of(page != null ? page : 0, 20)).withSort(SortBuilders.scoreSort()).withSort(SortBuilders.fieldSort("id.keyword"));

    return template.queryForPage(searchQuery.build(), ElasticsearchDocumentEntity.class);
  }

  private BoolQueryBuilder buildFilters(@RequestBody UISearchRequest searchRequest) {
    BoolQueryBuilder filter = QueryBuilders.boolQuery();
    if (searchRequest.getJudge() != null) {
      filter.filter(
              QueryBuilders.queryStringQuery(searchRequest.getJudge()).defaultField("judge")
      );
    }
    if (searchRequest.getCourt() != null)
      filter.filter(
              QueryBuilders.termQuery("court.keyword", searchRequest.getCourt())
      );
    if (searchRequest.getCaseNumber() != null) {
      filter.filter(
              QueryBuilders.termQuery("causeNumber.keyword", searchRequest.getCaseNumber()));
    }
    if (searchRequest.getCauseCategory() != null) {
      filter.filter(
              QueryBuilders.termQuery("category.keyword", searchRequest.getCauseCategory()));
    }
    if (searchRequest.getJudgmentForm() != null) {
      filter.filter(
              QueryBuilders.termQuery("judgment.keyword", searchRequest.getJudgmentForm()));
    }
    if (searchRequest.getJusticeKind() != null) {
      filter.filter(
              QueryBuilders.termQuery("justiceKind.keyword", searchRequest.getJusticeKind()));
    }
    if (searchRequest.getAdjudicationDateFrom() != null || searchRequest.getAdjudicationDateTo() != null) {
      filter.filter(QueryBuilders.rangeQuery("adjudicationDate").from(searchRequest.getAdjudicationDateFrom()).to(searchRequest.getAdjudicationDateTo()));
    }
    if (searchRequest.getReceiptDateFrom() != null || searchRequest.getReceiptDateTo() != null) {
      filter.filter(QueryBuilders.rangeQuery("receiptDate").from(searchRequest.getReceiptDateFrom()).to(searchRequest.getReceiptDateTo()));
    }
    return filter;
  }
}

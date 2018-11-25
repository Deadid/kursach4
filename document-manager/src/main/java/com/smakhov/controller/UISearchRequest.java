package com.smakhov.controller;

public class UISearchRequest {

  private String content;
  private String judge;
  private String caseNumber;
  private String causeCategory;
  private String region;
  private String court;
  private String judgmentForm;
  private String jussticeKind;
  private String adjudicationDateFrom;
  private String adjudicationDateTo;
  private String receiptDateFrom;
  private String receiptDateTo;
  private Integer page;


  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getJudge() {
    return judge;
  }

  public void setJudge(String judge) {
    this.judge = judge;
  }

  public String getCaseNumber() {
    return caseNumber;
  }

  public void setCaseNumber(String caseNumber) {
    this.caseNumber = caseNumber;
  }

  public String getCauseCategory() {
    return causeCategory;
  }

  public void setCauseCategory(String causeCategory) {
    this.causeCategory = causeCategory;
  }

  public String getRegion() {
    return region;
  }

  public void setRegion(String region) {
    this.region = region;
  }

  public String getCourt() {
    return court;
  }

  public void setCourt(String court) {
    this.court = court;
  }

  public String getJudgmentForm() {
    return judgmentForm;
  }

  public void setJudgmentForm(String judgmentForm) {
    this.judgmentForm = judgmentForm;
  }

  public String getJussticeKind() {
    return jussticeKind;
  }

  public void setJussticeKind(String jussticeKind) {
    this.jussticeKind = jussticeKind;
  }

  public String getAdjudicationDateFrom() {
    return adjudicationDateFrom;
  }

  public void setAdjudicationDateFrom(String adjudicationDateFrom) {
    this.adjudicationDateFrom = adjudicationDateFrom;
  }

  public String getAdjudicationDateTo() {
    return adjudicationDateTo;
  }

  public void setAdjudicationDateTo(String adjudicationDateTo) {
    this.adjudicationDateTo = adjudicationDateTo;
  }

  public String getReceiptDateFrom() {
    return receiptDateFrom;
  }

  public void setReceiptDateFrom(String receiptDateFrom) {
    this.receiptDateFrom = receiptDateFrom;
  }

  public String getReceiptDateTo() {
    return receiptDateTo;
  }

  public void setReceiptDateTo(String receiptDateTo) {
    this.receiptDateTo = receiptDateTo;
  }

  public Integer getPage() {
    return page;
  }

  public void setPage(Integer page) {
    this.page = page;
  }

  @Override
  public String toString() {
    return "UISearchRequest{" +
            "content='" + content + '\'' +
            ", judge='" + judge + '\'' +
            ", caseNumber='" + caseNumber + '\'' +
            ", causeCategory='" + causeCategory + '\'' +
            ", region='" + region + '\'' +
            ", court='" + court + '\'' +
            ", judgmentForm='" + judgmentForm + '\'' +
            ", jussticeKind='" + jussticeKind + '\'' +
            ", adjudicationDateFrom='" + adjudicationDateFrom + '\'' +
            ", adjudicationDateTo='" + adjudicationDateTo + '\'' +
            ", receiptDateFrom='" + receiptDateFrom + '\'' +
            ", receiptDateTo='" + receiptDateTo + '\'' +
            '}';
  }
}

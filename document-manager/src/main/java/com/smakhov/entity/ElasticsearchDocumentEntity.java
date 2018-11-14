package com.smakhov.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;


@Document(indexName="document", type = "document")
public class ElasticsearchDocumentEntity {

	private String id;

	@Field(analyzer = "ukrainian", searchAnalyzer = "ukrainian", type = FieldType.Text)
	private String content;

	@Field(analyzer = "ukrainian", searchAnalyzer = "ukrainian", type = FieldType.Text)
	private String court;

	@Field(analyzer = "ukrainian", searchAnalyzer = "ukrainian", type = FieldType.Text)
	private String judge;

	@Field(analyzer = "ukrainian", searchAnalyzer = "ukrainian", type = FieldType.Text)
	private String justiceKind;

	@Field(analyzer = "ukrainian", searchAnalyzer = "ukrainian", type = FieldType.Text)
	private String causeNumber;

	@Field(analyzer = "ukrainian", searchAnalyzer = "ukrainian", type = FieldType.Text)
	private String category;

	@Field(analyzer = "ukrainian", searchAnalyzer = "ukrainian", type = FieldType.Text)
	private String judgment;

	@Field(type = FieldType.Date, store = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date adjudicationDate;

	@Field(type = FieldType.Date, store = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date receiptDate;


	public ElasticsearchDocumentEntity() {
	}

	public ElasticsearchDocumentEntity( String content) {
		this.content = content;
	}

	public ElasticsearchDocumentEntity(String id, String content) {
		this.id = id;
		this.content = content;
	}

	public ElasticsearchDocumentEntity(String id, String content, String court, String judge, String justiceKind, String causeNumber, String category, String judgment, Date adjudicationDate, Date receiptDate) {
		this.id = id;
		this.content = content;
		this.court = court;
		this.judge = judge;
		this.justiceKind = justiceKind;
		this.causeNumber = causeNumber;
		this.category = category;
		this.judgment = judgment;
		this.adjudicationDate = adjudicationDate;
		this.receiptDate = receiptDate;
	}

	public String getContent() {
		return content;
	}


	public String getId() {
		return id;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getCourt() {
		return court;
	}

	public void setCourt(String court) {
		this.court = court;
	}

	public Date getAdjudicationDate() {
		return adjudicationDate;
	}

	public void setAdjudicationDate(Date adjudicationDate) {
		this.adjudicationDate = adjudicationDate;
	}

	public Date getReceiptDate() {
		return receiptDate;
	}

	public void setReceiptDate(Date receiptDate) {
		this.receiptDate = receiptDate;
	}

	public String getJudge() {
		return judge;
	}

	public void setJudge(String judge) {
		this.judge = judge;
	}

	public String getJusticeKind() {
		return justiceKind;
	}

	public void setJusticeKind(String justiceKind) {
		this.justiceKind = justiceKind;
	}

	public String getCauseNumber() {
		return causeNumber;
	}

	public void setCauseNumber(String causeNumber) {
		this.causeNumber = causeNumber;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getJudgment() {
		return judgment;
	}

	public void setJudgment(String judgment) {
		this.judgment = judgment;
	}

	@Override
	public String toString() {
		return "ElasticsearchDocumentEntity{" +
				"content='" + content + '\'' +
				", id='" + id + '\'' +
				'}';
	}
}

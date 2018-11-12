package com.smakhov.entity;

import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName="document", type = "document")
public class ElasticsearchDocumentEntity {
	
	@Field(analyzer = "ukrainian", searchAnalyzer = "ukrainian", type = FieldType.String)
	private String content;

	private String id;
	
	public ElasticsearchDocumentEntity() {
	}

	public ElasticsearchDocumentEntity( String content) {
		this.content = content;
	}

	public ElasticsearchDocumentEntity(String id, String content) {
		this.id = id;
		this.content = content;
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

	@Override
	public String toString() {
		return "ElasticsearchDocumentEntity{" +
				"content='" + content + '\'' +
				", id='" + id + '\'' +
				'}';
	}
}

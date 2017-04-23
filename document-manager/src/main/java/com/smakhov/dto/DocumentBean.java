package com.smakhov.dto;

import org.springframework.hateoas.ResourceSupport;

public class DocumentBean extends ResourceSupport {
	
	private String title;
	private String content;
	private String documentId;
	
	
	public String getDocumentId() {
		return documentId;
	}

	public void setDocumentId(String documentId) {
		this.documentId = documentId;
	}

	public DocumentBean(String documentId, String title, String content) {
		this.title = title;
		this.content = content;
		this.documentId = documentId;
	}
	
	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
}

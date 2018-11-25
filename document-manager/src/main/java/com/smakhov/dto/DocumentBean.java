package com.smakhov.dto;

import org.springframework.hateoas.ResourceSupport;

public class DocumentBean extends ResourceSupport {
	
	private String justiceKind;
	private String causeNum;
	private String documentId;
	private String url;
	
	
	public String getDocumentId() {
		return documentId;
	}

	public void setDocumentId(String documentId) {
		this.documentId = documentId;
	}

	public DocumentBean(String documentId, String justiceKind, String causeNum, String url) {
		this.justiceKind = justiceKind;
		this.causeNum = causeNum;
		this.documentId = documentId;
		this.url = url;
	}
	
	public String getJusticeKind() {
		return justiceKind;
	}


	public void setJusticeKind(String justiceKind) {
		this.justiceKind = justiceKind;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getCauseNum() {
		return causeNum;
	}
	public void setCauseNum(String causeNum) {
		this.causeNum = causeNum;
	}
}

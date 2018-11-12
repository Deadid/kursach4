package com.smakhov.dto;

import org.springframework.hateoas.ResourceSupport;

public class DocumentBean extends ResourceSupport {
	
	private String justiceKind;
	private String causeNum;
	private String documentId;
	
	
	public String getDocumentId() {
		return documentId;
	}

	public void setDocumentId(String documentId) {
		this.documentId = documentId;
	}

	public DocumentBean(String documentId, String justiceKind, String causeNum) {
		this.justiceKind = justiceKind;
		this.causeNum = causeNum;
		this.documentId = documentId;
	}
	
	public String getJusticeKind() {
		return justiceKind;
	}


	public void setJusticeKind(String justiceKind) {
		this.justiceKind = justiceKind;
	}


	public String getCauseNum() {
		return causeNum;
	}
	public void setCauseNum(String causeNum) {
		this.causeNum = causeNum;
	}
}

package com.smakhov.dto;

public enum Language {
	RUSSIAN ("rus"),
	UKRAINIAN ("ukr"),
	ENGLISH ("eng");
	
	private String language;

	private Language(String language) {
		this.language = language;
	}

	public String getLanguage() {
		return language;
	}
	
	
}	

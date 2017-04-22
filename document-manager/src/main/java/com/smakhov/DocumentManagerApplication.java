package com.smakhov;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@SpringBootApplication
@EnableElasticsearchRepositories(basePackages="com.smakhov.dao")
public class DocumentManagerApplication {

	public static void main(String[] args) {
		//System.setProperty("jna.library.path", "F:\\Education\\8th semester\\K-sach\\document-manager");
		SpringApplication.run(DocumentManagerApplication.class, args);
	}
}

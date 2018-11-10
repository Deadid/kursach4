package com.smakhov;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@SpringBootApplication
@EnableJpaRepositories
@EnableElasticsearchRepositories(basePackages="com.smakhov.dao")
public class DocumentManagerApplication {

	public static void main(String[] args) {
		//System.setProperty("jna.library.path", "F:\\Education\\8th semester\\K-sach\\document-manager");
		SpringApplication.run(DocumentManagerApplication.class, args);
	}
}

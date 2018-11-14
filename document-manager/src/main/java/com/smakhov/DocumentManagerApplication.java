package com.smakhov;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaRepositories
@EnableAsync
@Import(Config.class)
@EnableElasticsearchRepositories(basePackages="com.smakhov.dao")
public class DocumentManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DocumentManagerApplication.class, args);
	}
}

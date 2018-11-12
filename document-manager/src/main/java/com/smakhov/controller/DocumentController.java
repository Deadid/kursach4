package com.smakhov.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.smakhov.dao.elasticsearch.DocumentDao;
import com.smakhov.entity.DocumentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smakhov.dao.elasticsearch.ElasticsearchDocumentDao;
import com.smakhov.dto.DocumentBean;
import com.smakhov.entity.ElasticsearchDocumentEntity;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

@RestController
@RequestMapping("/document")
@CrossOrigin(origins = "*")
public class DocumentController {

	private final ElasticsearchDocumentDao elasticsearchDocumentDao;
	private final DocumentDao documentDao;

	public DocumentController(ElasticsearchDocumentDao elasticsearchDocumentDao, DocumentDao documentDao) {
		this.elasticsearchDocumentDao = elasticsearchDocumentDao;
		this.documentDao = documentDao;
	}

	@GetMapping("/{id}")
	public DocumentBean getById(@PathVariable String id) {

		DocumentEntity found = documentDao.findOne(id);
		DocumentBean bean = new DocumentBean(found.getId(), found.getJusticeKind().getName(), found.getCauseNumber());
		bean.add(linkTo(methodOn(DocumentController.class).getById(id)).withSelfRel());

		return bean;
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable String id) {
		elasticsearchDocumentDao.delete(id);
	}
	
	@PostMapping("/search")
	public Page<ElasticsearchDocumentEntity> search(@RequestParam("query") String query) {
		return elasticsearchDocumentDao.findByTitle(query, new PageRequest(0, 1000));
	}
	
	@GetMapping("/")
	public List<DocumentBean> findAll() {
		List<ElasticsearchDocumentEntity> entities = new ArrayList<>();
				elasticsearchDocumentDao.findAll().forEach(entities::add);
		return entities.stream().map(entity -> {
			DocumentBean bean = new DocumentBean(entity.getId(), entity.getId(), entity.getContent());
			bean.add(linkTo(methodOn(DocumentController.class).getById(entity.getId())).withSelfRel());
			return bean;
		}).collect(Collectors.toList());
	}

	
}

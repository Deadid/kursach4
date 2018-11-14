package com.smakhov.controller;

import com.smakhov.dao.elasticsearch.DocumentDao;
import com.smakhov.dao.elasticsearch.ElasticsearchDocumentDao;
import com.smakhov.dto.DocumentBean;
import com.smakhov.entity.DocumentEntity;
import com.smakhov.entity.ElasticsearchDocumentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

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

		DocumentEntity found = documentDao.findById(id).get();
		DocumentBean bean = new DocumentBean(found.getId(), found.getJusticeKind().getName(), found.getCauseNumber());
		bean.add(linkTo(methodOn(DocumentController.class).getById(id)).withSelfRel());

		return bean;
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable String id) {
		elasticsearchDocumentDao.deleteById(id);
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

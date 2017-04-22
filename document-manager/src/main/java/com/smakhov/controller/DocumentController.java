package com.smakhov.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smakhov.dao.DocumentDao;
import com.smakhov.dto.DocumentBean;
import com.smakhov.entity.DocumentEntity;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

@RestController
@RequestMapping("/document")
@CrossOrigin(origins = "*")
public class DocumentController {
	
	@Autowired
	private DocumentDao dao;

	@GetMapping("/{id}")
	public DocumentBean getById(@PathVariable String id) {
		DocumentEntity found = dao.findOne(id);
		DocumentBean bean = new DocumentBean(found.getTitle(), found.getContent());
		bean.add(linkTo(methodOn(DocumentController.class).getById(id)).withSelfRel());

		return bean;
	}
	
	@GetMapping("/")
	public List<DocumentBean> findAll() {
		List<DocumentEntity> entities = new ArrayList<>(); 
				dao.findAll().forEach(entities::add);
		return entities.stream().map(entity -> {
			DocumentBean bean = new DocumentBean(entity.getTitle(), entity.getContent());
			bean.add(linkTo(methodOn(DocumentController.class).getById(entity.getId())).withSelfRel());
			return bean;
		}).collect(Collectors.toList());
	}

	@PostMapping("/")
	public DocumentBean handleFileUpload(@RequestParam("file") MultipartFile multipartFile)
			throws IllegalStateException, IOException {
		ITesseract tesseract = new Tesseract();
		DocumentEntity saved = dao.save(new DocumentEntity());
		saved.setDownload((saved.getId() + multipartFile.getOriginalFilename()));
		File file = new File(saved.getDownload());
		file.createNewFile();
		FileOutputStream fos = new FileOutputStream(file);
		fos.write(multipartFile.getBytes());
		fos.close();
		String result = null;
		try {
			tesseract.setLanguage("eng+rus+ukr");
			result = tesseract.doOCR(file);
		} catch (TesseractException e) {
			System.err.println(e.getMessage());
		}
		saved.setContent(result);
		dao.save(saved);
		DocumentBean bean = new DocumentBean(saved.getTitle(), saved.getContent());
		bean.add(linkTo(methodOn(DocumentController.class).getById(saved.getId())).withSelfRel());
		return bean;
	}
	
	
}

package com.smakhov.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smakhov.dao.DocumentDao;

@RestController
@RequestMapping("/file")
public class FileController {
	
	@Autowired
	private DocumentDao dao; 
	
	@GetMapping("/{id}")
	public void getFile(@PathVariable("id") String id, HttpServletResponse response) {
		String filename = dao.findOne(id).getDownload();
		try {
		      // get your file as InputStream
		      InputStream is = new FileInputStream(filename);
		      // copy it to response's OutputStream
		      org.apache.commons.io.IOUtils.copy(is, response.getOutputStream());
		      response.flushBuffer();
		    } catch (IOException ex) {
		      throw new RuntimeException("IOError writing file to output stream");
		    }
	}
}

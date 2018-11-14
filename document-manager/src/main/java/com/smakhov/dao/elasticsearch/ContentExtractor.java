package com.smakhov.dao.elasticsearch;

import com.rtfparserkit.converter.text.StringTextConverter;
import com.rtfparserkit.parser.RtfStreamSource;
import org.jsoup.Jsoup;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;

@Component
public class ContentExtractor {


  public String extractContent(String docUrl) {
    if (docUrl == null) {
      return "";
    }
    String[] dotted = docUrl.split("\\.");
    String format = dotted[dotted.length - 1];

    switch (format) {
      case "rtf":
        return extractRtf(docUrl);
      case "html":
        return extractHtml(docUrl);
      default:
        throw new IllegalArgumentException("Uknown format! " + format);
    }
  }

  private String extractHtml(String docUrl) {

    try {
      return Jsoup.connect(docUrl).execute().parse().body().text();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private String extractRtf(String docUrl) {
    StringTextConverter converter = new StringTextConverter();
    try {
      converter.convert(new RtfStreamSource(new URL(docUrl).openStream()));
    } catch (FileNotFoundException e) {
      return "FILE NOT FOUND";
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return converter.getText();
  }
}

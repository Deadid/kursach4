
CREATE TABLE "document" (
  doc_id VARCHAR(255) PRIMARY KEY,
  court_code VARCHAR(255) REFERENCES court(court_code),
  judgment_code VARCHAR(255) REFERENCES judgment_form(judgment_code),
  justice_kind VARCHAR(255) REFERENCES justice_kind(justice_kind),
  category_code	VARCHAR(255) REFERENCES cause_category(category_code),
  cause_num	VARCHAR(255),
  adjudication_date date,
  receipt_date date,
  judge	TEXT,
  doc_url	TEXT,
  status BIGINT NOT NULL,
  date_publ date
);
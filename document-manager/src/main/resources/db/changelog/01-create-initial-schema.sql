CREATE TABLE "cause_category" (
 category_code VARCHAR(255) PRIMARY KEY,
 name TEXT NOT NULL
);
CREATE TABLE "instance" (
  instance_code VARCHAR(255) PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE "region" (
 region_code VARCHAR(255) PRIMARY KEY,
 name TEXT NOT NULL
);

CREATE TABLE "judgment_form" (
  judgment_code VARCHAR(255) PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE "justice_kind" (
  justice_kind VARCHAR(255) PRIMARY KEY,
  name TEXT NOT NULL
);

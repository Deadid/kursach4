CREATE TABLE "court" (
  court_code VARCHAR(255) PRIMARY KEY,
  name TEXT NOT NULL,
  instance_code VARCHAR(255) REFERENCES instance(instance_code),
  region_code VARCHAR(255) REFERENCES "region"("region_code")
);

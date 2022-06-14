\c qandadb;

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INT,
  body TEXT,
  date_written BIGINT,
  asker_name TEXT,
  asker_email TEXT,
  reported INT,
  helpful INT
);

CREATE TABLE IF NOT EXISTS answers (
   id SERIAL PRIMARY KEY,
   question_id INT REFERENCES questions(id),
   body TEXT,
   date_written BIGINT,
   answerer_name TEXT,
   answerer_email TEXT,
   reported INT,
   helpful INT
);

CREATE TABLE IF NOT EXISTS answerimages (
  id SERIAL PRIMARY KEY,
  answer_id INT REFERENCES answers(id),
  url TEXT
);
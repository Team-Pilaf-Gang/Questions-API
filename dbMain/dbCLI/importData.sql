\COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
FROM '/Users/justinchesterfield/hack/SDC_CSVs/questions.csv'
DELIMITER ','
CSV HEADER;
SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'id'), (SELECT MAX(id) FROM questions)+1);

\COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
FROM '/Users/justinchesterfield/hack/SDC_CSVs/answers.csv'
DELIMITER ','
CSV HEADER;
SELECT pg_catalog.setval(pg_get_serial_sequence('answers', 'id'), (SELECT MAX(id) FROM answers)+1);

\COPY answerimages(id, answer_id, url)
FROM '/Users/justinchesterfield/hack/SDC_CSVs/answers_photos.csv'
DELIMITER ','
CSV HEADER;
SELECT pg_catalog.setval(pg_get_serial_sequence('answerimages', 'id'), (SELECT MAX(id) FROM answerimages)+1);

create index product_id on questions(product_id);
create index question_id on answers(question_id);
create index answer_id on answerimages(answer_id);

ALTER TABLE questions ADD COLUMN datetz DATE;
UPDATE questions SET datetz = to_timestamp(questions.date_written/1000);
ALTER TABLE questions DROP COLUMN date_written;
ALTER TABLE questions RENAME COLUMN datetz TO question_date;

ALTER TABLE answers ADD COLUMN datetz DATE;
UPDATE answers SET datetz = to_timestamp(answers.date_written/1000);
ALTER TABLE answers DROP COLUMN date_written;
ALTER TABLE answers RENAME COLUMN datetz TO date;

ALTER TABLE questions RENAME COLUMN id TO question_id;
ALTER TABLE questions RENAME COLUMN body TO question_body;
ALTER TABLE questions RENAME COLUMN helpful TO question_helpfulness;
ALTER TABLE answers RENAME COLUMN helpful TO helpfulness;
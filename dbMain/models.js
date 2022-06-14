const { db } = require('./db.js');

const getQ = (prodId, page, count) => {
  const requestQ =
    `SELECT json_build_object(
      'product_id', ${prodId},
      'results', (SELECT json_agg(json_build_object(
        'question_id', question_id,
        'question_body', question_body,
        'question_date', question_date,
        'asker_name', asker_name,
        'question_helpfulness', question_helpfulness,
        'reported', reported,

        'answers', COALESCE((SELECT json_object_agg(answers.answer_id, json_build_object(
          'id', answers.answer_id,
          'body', answers.body,
          'date', answers.date,
          'answerer_name', answers.answerer_name,
          'helpfulness', answers.helpfulness,

          'answerimages', COALESCE((SELECT json_agg(json_build_object(
            'id', answerimages.id,
            'url', answerimages.url
          )) FROM answerimages WHERE answerimages.answer_id=answers.answer_id), '[]')

        )) FROM answers WHERE question_id=questions.question_id), '[]')

      )) FROM questions WHERE product_id=$1 LIMIT $2 OFFSET $3)
    )`;

  return db.query(requestQ, [prodId, count || 5, (count || 5) * ((page || 1) - 1)]);
}

const getA = (questId, page, count) => {
  const requestA =
    `SELECT json_build_object(
      'question', ${questId},
      'page', ${page || 1},
      'count', ${count || 5},
      'results', (SELECT json_object_agg(answers.answer_id, json_build_object(
        'id', answers.answer_id,
        'body', answers.body,
        'date', answers.date,
        'answerer_name', answers.answerer_name,
        'helpfulness', answers.helpfulness,

        'answerimages', COALESCE((SELECT json_agg(json_build_object(
          'id', answerimages.id,
          'url', answerimages.url
        )) FROM answerimages WHERE answerimages.answer_id=answers.answer_id), '[]')

      )) FROM answers WHERE question_id=$1 LIMIT $2 OFFSET $3)
    )`;

  return db.query(requestA, [questId, count || 5, (count || 5) * ((page || 1) - 1)]);
}

const testQ = (prodId, page, count) => {
    const requestQ = `SELECT question_id, question_body, question_date, asker_name, question_helpfulness,
    (SELECT COALESCE(JSON_object_agg(agg.answer_id, agg), '[]')
    FROM
      (SELECT answer_id, body, date, answerer_name, helpfulness,
        (SELECT COALESCE(JSON_agg(answerimages), '[]')
        FROM answerimages WHERE answers.answer_id = answerimages.answer_id) AS photos
      FROM answers
    WHERE questions.question_id = answers.question_id) AS agg) AS answers
  FROM questions WHERE product_id=$1 AND questions.reported=0  LIMIT $2 OFFSET $3`;


    return db.query(requestQ, [prodId, count || 5, (count || 5) * ((page || 1) - 1)]);
  }


module.exports = {
  getQ,
  getA,
  testQ
  //postQ
  // postA,
  // repQ,
  // helplQ,
  // repA,
  // helpA,
};
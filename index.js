const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
const { testQ, getQ, getA, postQ, postA, helpQ, helpA, repQ, repA } = require('./dbMain/models.js');

app.use(express.json());
console.log(process.env);
app.get('/test/:productId', (req, res) => {
  testQ(req.params.productId, req.params.count, req.params.page)
  .then((data) => res.status(200).send(data.rows))
  .catch((err) => console.log(err))
  .then();
});

app.get('/qa/questions/:productId', (req, res) => {
  getQ(req.params.productId, req.params.count, req.params.page)
    .then((data) => res.status(200).send(data.rows[0].json_build_object))
    .catch((err) => console.log(err))
    .then();
});

app.get('/qa/questions/:questionId/answers', (req, res) => {
  getA(req.params.questionId, req.params.count, req.params.page)
    .then((data) => res.status(200).send(data.rows[0].json_build_object))
    .catch((err) => console.log(err))
    .then();
});

app.listen(PORT, () => {
  console.log('server is operating on port 5005')
});
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const { MOCK_NPM_PORT } = process.env;
const port = MOCK_NPM_PORT || 8888;

// todo: strategy so that we can test:
// - package not existing
// - existing w/ new version
// - existing w/ version conflict
// - etc.

// package does not exist
app.get("/:package", (req, res) => {
  const { package } = req.params;
  console.log(`-> GET /${package}`);
  console.log(`<- 404`);
  res.sendStatus(404);
});

// package exists
// app.get("/:package", (req, res) => {
//   const { package } = req.params;
//   console.log(`-> GET /${package}`);
//   res.status(200).send({
//     _id: package,
//     _rev: "xxx",
//     name: package,
//     versions: {},
//   });
// });

app.put("/:package", (req, res) => {
  const { package } = req.params;
  console.log(`-> PUT /${package}`);
  console.log(req.body);
  console.log(`<- 201`);
  res.sendStatus(201);
});

app.all(/(.*)/, (req, res) => {
  console.log({
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Mock NPM Registry listening on port ${port}...`);
});

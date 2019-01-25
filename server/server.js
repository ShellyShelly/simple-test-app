const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/hello', (request, response) => response.send({data: 'Hello World!'}));

app.post('/bye', (request, response) => {
  const name = request.body.name;

  response.send({data: `Ohh No! Bye, ${name}`});
});

app.get('/bye', (request, response) => response.send({data: 'Bye!'}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

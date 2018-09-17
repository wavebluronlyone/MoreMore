var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  request.get(
    "https://api.omise.co/recipients",
    {
      auth: {
        user: "skey_test_5clqj3htt3fid9b9vfe"
      }
    },
    function(error, response, body) {
      res.send(body);
    }
  );
});

app.listen(8080);
console.log("My Service is listening to port 8080.");

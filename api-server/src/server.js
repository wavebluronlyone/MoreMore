var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

// var publicKey = "pkey_test_5dk77lui11gdmmp9jc4";
// var privateKey = "skey_test_5dk77lui9m6jv0s33pp";

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/list", function(req, res) {
  var data = req.body;
  res.redirect(data.url);
});

// app.post("/", function(req, res) {
//   var data = req.body;
//   var dataString =
//     "card[name]=JOHN DOE&card[number]=" +
//     data.number +
//     "&card[security_code]=" +
//     data.code +
//     "&card[expiration_month]=" +
//     data.expireMonth +
//     "&card[expiration_year]=" +
//     data.expireYear;
//   request.post(
//     "https://vault.omise.co/tokens",
//     {
//       auth: {
//         user: publicKey
//       },
//       body: dataString
//     },
//     function(error, response, body) {
//       res.send(body);
//     }
//   );
// });

app.get("/linkSheet",function(req,res){
  res.redirect('https://arxiv.org/pdf/1701.08393.pdf');
})

app.post("/charges", function(req, res) {
  var data = req.body;
  var dataString =
    "description=Charge for order 3947&amount=" +
    data.prices +
    "&currency=thb&return_uri=http://www.example.com/orders/3947/complete&card=" +
    data.tokens;
  request.post(
    "https://api.omise.co/charges",
    {
      auth: {
        user: privateKey
      },
      body: dataString
    },
    function(error, response, body) {
      res.send(body);
    }
  );
});

app.post("/linePay", function(req, res) {
  var data = req.body;
  var headers = {
    "Content-Type": "application/json",
    "X-LINE-ChannelId": "1634944383",
    "X-LINE-ChannelSecret": "61ccd09a220863c54c519a88cba9d1d1",
    "X-LINE-MerchantDeviceProfileId": "DEVICE PROFILE ID"
  };
  var dataString = {
    productName: "TUMoreSheet",
    amount: data.prices,
    currency: "THB",
    orderId: "20140101123456789",
    confirmUrl: "https://my-project-9d06f.firebaseapp.com/BuyComplete",
    cancelUrl: "https://my-project-9d06f.firebaseapp.com/BuyCancel"
  };
  request.post(
    "https://sandbox-api-pay.line.me/v2/payments/request",
    {
      headers: headers,
      body: JSON.stringify(dataString)
    },
    function(error, response, body) {
      res.send(body);
    }
  );
});

app.listen(8080);
console.log("My Service is listening to port 8080.");

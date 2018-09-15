var omise = require("../node_modules/omise/index")({
  secretKey: "skey_test_5clqj3htt3fid9b9vfe",
  omiseVersion: "2017-11-02"
});

omise.customers.list(function(err, list) {
  console.log(list.data);
});

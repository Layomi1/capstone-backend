const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.get("/paystack", function (req, res) {
  const https = require("https");

  const params = JSON.stringify({
    email: "customer@email.com",
    amount: "20000",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: "Bearer sk_test_b7450d574ff4e68902559930702d5b317739f011",
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        res.send(data);
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpaystack.write(params);
  reqpaystack.end();
});

app.listen(port, () => {});

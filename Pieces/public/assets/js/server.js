const express = require("express");

const app = express();

PORT = 7676;

app.get("/", (req, res) => {
  res.send("is working");
});

app.listen(PORT, function () {
  console.log(`Application running on PORT ${PORT}`);
});

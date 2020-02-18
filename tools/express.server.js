const express = require("express");
const app = express();
// const path = require("path");

// app.get("/", (req, res, next) => {
//   console.log(path.join(__dirname, "../build", "index.html"));
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });

app.use(express.static("build"));
app.use("*", express.static("build"));

app.listen(8080, () => {
  console.log("Listening on port 8080...");
});

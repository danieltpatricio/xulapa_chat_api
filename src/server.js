require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const firebase = require("./utils/firebase");

firebase.init();
const app = express();

app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  const help = `
  <pre>
    Campus Party Natal - Xulapa chat api
 </pre>
  `;
  res.send(help);
});

app.use((req, res, next) => {
  const token = req.get("Authorization");
  if (token) {
    req.token = token;
    next();
  } else {
    res.status(403).send({
      error:
        "Please provide an Authorization header to identify yourself (can be whatever you want)"
    });
  }
});

app.listen(config.port, () => {
  console.log("Server listening on port %s, Ctrl+C to stop", config.port);
});

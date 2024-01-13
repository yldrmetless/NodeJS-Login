const express = require("express");
const app = express();
const mysql = require("mysql2");

const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const db = require("./data/db");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("node_modules"));

const userRoutes = require("./routes/users");

app.use(userRoutes);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MeteY.35534994",
  database: "nodejslogin",
});

connection.connect(function (err) {
  if (err) throw err;
  else {
    console.log("connected to the database successfully");
  }
});

app.get("/", function (req, res) {
  res.render("index", { title: "login page" });
}); 

app.post("/", encoder, function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  connection.query(
    "select * from loginuser where user_name = ? and user_pass = ?",
    [username, password],
    function (error, results, fields) {
        console.log(results);
      if (results.length > 0) {
        res.redirect("/patients");
      } else {
        res.redirect("/");
      }
      res.end();
    }
  );
});

//when login is success
app.get("/patientpage", function (req, res) {
  // res.render("products", {title: "home page"});
  res.render("patientpage", { title: "patientpage page" });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

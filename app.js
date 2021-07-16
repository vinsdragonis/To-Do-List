//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let workList = [];
let tasks = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  const day = date.getDate();

  res.render('list', {listTitle: day, newListItems: tasks});
});

app.post("/", function(req, res) {
  const task = req.body.newTask;

  if (req.body.list === "Work") {
    workList.push(task);
    res.redirect("/work");
  } else {
    tasks.push(task)
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workList});
});

app.post("/work", function(req, res) {
  const task = req.body.newTask;
  workList.push(task)
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});

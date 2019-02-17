const express = require("express");
const fs = require("fs");
const methodOverride = require("method-override");

const app = express();

const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/articles");
});

// 1 index
app.get("/articles", (req, res) => {
  let articles = JSON.parse(fs.readFileSync("./articles.json"));
  res.render("articles/index", { articles });
});

// 6(2) new
app.get("/articles/new", (req, res) => {
  res.render("articles/new");
});

// 2(6) create
app.post("/articles", (req, res) => {
  let articles = JSON.parse(fs.readFileSync("./articles.json"));
  articles.push(req.body);
  fs.writeFileSync("./articles.json", JSON.stringify(articles));
  res.redirect("/articles");
});

// 3 show
app.get("/articles/:id", (req, res) => {
  let articles = JSON.parse(fs.readFileSync("./articles.json"));
  res.render("articles/show", {
    article: articles[parseInt(req.params.id)],
    id: req.params.id
  });
});

// 5 delete
app.delete("/articles/:id", (req, res) => {
  let articles = JSON.parse(fs.readFileSync("./articles.json"));
  articles.splice(parseInt(req.params.id), 1);
  fs.writeFileSync("./articles.json", JSON.stringify(articles));
  res.redirect("/articles");
});

// 7(4) edit
app.get("/articles/:id/edit", (req, res) => {
  let articles = JSON.parse(fs.readFileSync("./articles.json"));
  let id = parseInt(req.params.id);
  res.render("articles/edit", {
    article: articles[id],
    id: id
  });
});

// 4(7) update
app.put("/articles/:id", (req, res) => {
  let articles = JSON.parse(fs.readFileSync("./articles.json"));
  let id = parseInt(req.params.id);
  articles[id] = req.body;
  fs.writeFileSync("./articles.json", JSON.stringify(articles));
  res.redirect("/articles/" + id);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

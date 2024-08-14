const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.render("index", { files: files });
    // console.log(files);
  });
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render("show", { filename: req.params.filename, filedata: filedata });
  });
});
app.get("/delete/:filename", (req, res) => {
  fs.rm(`./files/${req.params.filename}`, (err) => {
    // console.log(err);
    res.redirect("/");
  });
});
app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.note,
    (err) => {}
  );
  res.redirect("/");
});
app.post("/edit", (req, res) => {
  console.log(req.body);
  fs.rename(
    `./files/${req.body.title}`,
    `./files/${req.body.newname}`,
    (err) => {
      // console.log(err.message);

    }
  );
  res.redirect("/");
});

app.listen(3001, () => {
  console.log("its running on http://localhost:3001");
});

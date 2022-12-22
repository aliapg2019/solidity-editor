

const solc = require("solc");

const path = require("path");
const fs = require("fs");

const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const formidable = require('formidable');



app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
origin: "*",
methods: "*",
}));

app.post("/upload", (req, res) => {
    console.log(req.url);
    if (req.url == '/fileupload') {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.filepath;
        var newpath = 'C:/Users/pc-backed-master/Desktop/' + files.filetoupload.originalFilename;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write('File uploaded and moved!');
          res.end();
        });
   });
  }
});


app.listen(3000, () => {
    console.log("server started");
});
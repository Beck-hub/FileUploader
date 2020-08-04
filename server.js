const express = require('express');
const formidable = require('formidable');
const cors = require("cors");
const bodyParser = require("body-parser");
// formidable: A Node.js module for parsing form data, especially file uploads
     // Formidable just needs Node.js Request stream & no further 3rd party Express.js middlewares
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname+ "/public"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
   res.render('index');
});
 
app.post('/api/fileupload', (req, res, next) => {
  const form = formidable({ multiples: true });
  // More than one file can be selected & returned
  // For <input type="file">: to select multiple files, hold down the CTRL or SHIFT key while selecting
  form.parse(req, (err, fields, files) => {
      if (err) return next(err);
      let newArray = [files.upfile].flat(); 
     // so one file upload will be accepted & flatten so when this is already array due to multiple files, 
     // it can be flattenend to one array
      let result = newArray.map((obj) =>  {
        return { name: obj.name, type: obj.type, size: obj.size }; 
    });
      res.json(result.length === 1? result[0]: result);
      // this res.json is formatted so that it will pass FCC tests
  });
});
 const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT} ...`);
});

// Response: 
// {
    // name: "68993909_2227880247321265_1734655377238130688_n.jpg",
    // type: "image/jpeg",
    // size: 37907
    // }
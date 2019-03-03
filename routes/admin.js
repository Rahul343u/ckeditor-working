const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
var fs = require('fs');
var busboy = require('connect-busboy');

const router = express.Router();

var HOME_URL = 'http://localhost:3000';
var IMG_FOLDER = '/images/file/test/';

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

/*** image broser for ckeditor ***/
router.all('/browse_url', function(req, res) {
  var data = {};
  var dirname = process.cwd() + '/public/' + IMG_FOLDER;
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      return err;
    }
    var data = [];
    filenames.forEach(function(filename) {
      data.push({
        image: HOME_URL + IMG_FOLDER + filename,
        thumb: HOME_URL + IMG_FOLDER + filename,
        folder: 'Small'
      });
    });
    console.log(data);
    res.send(data);
  });
});

module.exports = router;

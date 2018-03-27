// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');


//Get all the files, if any
router.get('/compliment', function(req, res, next) {
  const fileModel = mongoose.model('File');

  fileModel.find({deleted: {$ne: true}}, function(err, files) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  
    res.json(files);
  });
});
//Get a specific file
router.get('/compliment/:fileId', function(req, res, next) {
  const {fileId} = req.params;
 

  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});

//Post a new file
router.post('/compliment', function(req, res, next) {
  const File = mongoose.model('File');
  const fileData = {
    compliment: req.body.compliment,
  };

  File.create(fileData, function(err, newFile) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(newFile);
  });
});

//Update an existing file
 
router.put('/compliment/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  File.findById(fileId, function(err, file) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "File not found"});
    }

    file.compliment = req.body.compliment;

    file.save(function(err, savedFile) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedFile);
    })

  })

});

//Delete a file

router.delete('/compliment/:fileId', function(req, res, next){
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  File.findById(fileId, function(err, file) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "Compliment not found"});
    }

    file.deleted = true;

    file.save(function(err, doomedFile) {
      res.json(doomedFile);
    })
  })
});


module.exports = router;
const mongoose = require ('mongoose');


const FileSchema = new mongoose.Schema({
    'compliment': String,
    deleted: {type: Boolean, default: false}
});

const File = mongoose.model('File', FileSchema);



File.count({}, function(err, count) {
    if (err) {
      throw err;
    }
  
    if (count > 0) return ;
  
    const files = require('./file.seed.json');
    File.create(files, function(err, newFiles) {
      if (err) {
        throw err;
      }
      console.log("DB seeded");
  });
});

module.exports = File;

//How the files in the database will be structured
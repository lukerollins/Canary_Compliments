const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes');

const mongoose = require('mongoose');

mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`)

require('./models/file.model.js');



const app = express();
const publicPath = path.resolve(__dirname, './public');
app.use(bodyParser.json());
app.use(express.static(publicPath));

app.use('/api', router);




app.listen(config.port, function() {
    console.log(`${config.appName} is listening on port ${config.port}`);
});

//Sets up everything the app will need and where to find it.

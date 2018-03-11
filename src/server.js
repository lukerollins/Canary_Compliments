const express = require('express');
const config = require('./config');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./models/file.model.js');

const app = express();
const router = require('./routes');
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`)

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use('/api', router);




app.listen(config.port, function() {
    console.log(`${config.appName} is listening on port ${config.port}`);
});


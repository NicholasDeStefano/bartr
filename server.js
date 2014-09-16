var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var config = require('./config/config');

var port = process.env.PORT || 1529;
mongoose.connect(config.development.db);

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require('./config/routes')(app);

app.listen(port);
console.log("App is listening on port " + port);
exports = module.exports = app;
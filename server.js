var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var passport = require("passport");
var flash = require("connect-flash");
var env = process.env.NODE_ENV || 'development';

var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var session = require("express-session");

var config = require('./config/config')[env];

var port = process.env.PORT || 1529;
mongoose.connect(config.db);

require('./config/passport')(passport);

var app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'letsbartr' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.engine('jade', require('jade').__express);

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require('./config/routes')(app, passport);

app.listen(port);
console.log("App is listening on port " + port);
exports = module.exports = app;
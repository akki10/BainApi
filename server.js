var express = require('express'),
    app = express(),
    port = process.env.PORT || 80,
    mongoose = require('mongoose'),
    Provider = require('./app/models/providersModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds137206.mlab.com:37206/heroku_fnkgx02h');


var fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true,limit: '30mb',parameterLimit: 1000000 }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Methods,Access-Control-Allow-Origin,X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var upload = require('./app/upload.js');
app.post('/upload', upload.post);

// app.use(function(req, res) {
//     res.status(404).send({"url":req.originalUrl,"msg":"Path not found"})//("<h1>(404) Path "+req.originalUrl+" not found</h1>")
// });

var routes = require('./app/routes/providersRoute');
routes(app); //register the route


app.listen(port);

console.log('Provider list RESTful API server started on: ' + port);
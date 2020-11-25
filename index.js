const express = require('express');
const routes = require('./routes');

// const https = require("https");

const app = express();

app.use(express.json());


app.use(routes);


app.listen(3333);


// var fs = require('fs');
// var http = require('http');
// var https = require('https');
// var privateKey  = fs.readFileSync('certificado.key', 'utf8');
// var certificate = fs.readFileSync('certificado.cert', 'utf8');

// var credentials = {key: privateKey, cert: certificate};
// var express = require('express');
// var app = express();

// app.get('/', (req, res) => {
//     res.send('Now using https..');
// });

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080);
// httpsServer.listen(8443);
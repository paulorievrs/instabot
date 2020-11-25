const express = require('express');

const instabot = require('./instabot');

const routes = express.Router();

routes.post('/post', instabot.postOnDate);


module.exports = routes;
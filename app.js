const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Raven = require('raven');
//const ravenConfig = require('./config.json');

const signContoller = require('./controllers/SignController');
const newsFeedController = require('./controllers/NewsFeedController');
const newsFeedLikeController = require('./controllers/NewsFeedLikeController');
const newsFeedPrizeController = require('./controllers/NewsFeedPrizeController');
const newsFeedReplyController = require('./controllers/NewsFeedReplyController');
const storyController = require('./controllers/StoryController');



const app = express();

//Raven.config(ravenConfig.DSN).install();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(Raven.requestHandler());


app.use('/sign', signContoller);
app.use('/newsFeed', newsFeedController);
app.use('/newsFeed/:newsFeedId/like', newsFeedLikeController);
app.use('/newsFeed/:newsFeedId/prize', newsFeedPrizeController);
app.use('/newsFeed/:newsFeedId/reply', newsFeedReplyController);
app.use('/story', storyController);



// app.use(Raven.errorHandler());

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.sendStatus(err.status || 503);
});

module.exports = app;

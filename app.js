const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Raven = require('raven');
// const ravenConfig = require('./config.json').raven;
// Raven.config(ravenConfig.DSN).install();



const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(Raven.requestHandler());


app.use('/sign', require('./controllers/signContoller'));
app.use('/newsFeed', require('./controllers/newsFeedController'));
app.use('/newsFeed/:newsFeedId/like', require('./controllers/newsFeedLikeController'));
app.use('/newsFeed/:newsFeedId/prize', require('./controllers/newsFeedPrizeController'));
app.use('/newsFeed/:newsFeedId/reply', require('./controllers/newsFeedReplyController'));
app.use('/newsFeed/:newsFeedId/prize/:prizeId/like', require('./controllers/newsFeedPrizeLikeController'));
app.use('/story', require('./controllers/storyController'));


// app.use(Raven.errorHandler());

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.sendStatus(err.status || 500);
});

module.exports = app;

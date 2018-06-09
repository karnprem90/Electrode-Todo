var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://premkarn:premkarn1@ds153890.mlab.com:53890/heroku_q3bds973');

module.exports = {
  mongoose
};

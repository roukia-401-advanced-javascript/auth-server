'use-strict';

// error from bad req like wrong url
module.exports = (req, res, next) => {
  res.status(404).send('404 Not Found');
};
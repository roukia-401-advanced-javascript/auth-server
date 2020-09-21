'use-strict';
// error due srver
// we have to have 4 arguments for the error Handler

module.exports = (err, req, res, next) => {
  console.log('i am the error');
  res.status(500).json({ err: err });
};
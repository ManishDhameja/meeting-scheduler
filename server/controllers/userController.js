const User = require('../models/user');

exports.getUser = (req, res, next) => {
  console.log("yesss");
  User.find({})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
}
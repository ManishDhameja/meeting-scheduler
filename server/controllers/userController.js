const User = require('../models/user');

exports.getUser = (req, res, next) => {
  User.find({}).populate('meetings')
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  })
  .catch((err) => next(err));
}
exports.getMeetings = (req, res, next) => {
  User.findOne({ email : req.body.email}).populate("meetings")
  .then((user) => {
    if(!user) {
      const error = new Error("A user with this username could not be found!");
      error.statusCode = 401;
      next(error);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user.meetings);
  })
  .catch((err) => next(err));
}
exports.addWorkingHours = (req, res, next) => {
  User.findOne({ email : req.body.email})
  .then((user) => {
    if(!user) {
      const error = new Error("A user with this username could not be found!");
      error.statusCode = 401;
      next(error);
    }
    user.workingHours.push({
      startTime: req.body.startTime,
      endTime: req.body.endTime
    });
    user.save()
    .then((result) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(result);
    });
  })
  .catch((err) => next(err));
}
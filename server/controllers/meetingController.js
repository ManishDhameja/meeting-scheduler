const Meeting = require('../models/meeting');
const User = require('../models/user');

exports.deleteMeeting = (req, res, next) => {
  const meetingId = req.body.meetingId;
  Meeting.findOne({"_id":meetingId})
  .then((meeting) => {
    if(!meeting) {
      const error = new Error("Meeting not found!!");
      error.statusCode = 401;
      next(error);
    }
    meeting.attendee.map((att) => {
      User.findOne({"username":att.username})
      .then((user) => {
        if(user) {
          user.meetings = user.meetings.filter(meet => meet._id !== meetingId);
          user.save();
        }
      })
    })
    meeting.deleteOne({"_id":meetingId});
  })
  .catch((err)=>next(err));
}
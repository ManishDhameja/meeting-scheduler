const Meeting = require("../models/meeting");
const User = require("../models/user");

exports.createMeeting = async (req, res, next) => {
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const title = req.body.title;
  const description = req.body.description;
  const meetingLink = req.body.meetingLink;
  const attendees = req.body.attendees;
  for(let att of attendees){
    await User.findOne({ username: att.username })
    .populate('meetings')
    .then((user) => {
      if (user) {
        var flag = "notAvaliable";
        for(var i=0;i<user.workingHours.length;i++){
          hr = user.workingHours[i];
          if (hr.startTime <= startTime && hr.endTime >= endTime) {
            user.meetings.map((meet) => {
              if (
                (meet.startTime >= startTime && meet.startTime <= endTime) ||
                (meet.endTime >= startTime && meet.endTime <= endTime)
              ) {
                
                res.statusCode = 401;
                res.end(`${user.name} is already scheduled somewhere`);
              }
            });
            flag = "scheduled";
            break;
          }
        }
        if (flag === "notAvaliable") {
          res.statusCode = 401;
          res.end(`${user.name} is not avaliable`);
        }
      }
    })
    .catch(err => {return next(err)});
  }
  Meeting.create({
    startTime: startTime,
    endTime: endTime,
    title: title,
    description: description,
    meetingLink: meetingLink,
    attendees: attendees,
  })
  .then((meet) => {
    attendees.map((attendee) => {
      User.findOne({username:attendee.username})
      .then((user) => {
        user.meetings.push(meet._id);
        user.save();
      })
    })
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(meet);
  })
  .catch((err) => next(err));
};

exports.deleteMeeting = (req, res, next) => {
  const meetingId = req.body.meetingId;
  Meeting.findOne({ _id: meetingId })
    .then((meeting) => {
      if (!meeting) {
        const error = new Error("Meeting not found!!");
        error.statusCode = 401;
        next(error);
      }
      meeting.attendee.map((att) => {
        User.findOne({ username: att.username }).then((user) => {
          if (user) {
            user.meetings = user.meetings.filter(
              (meet) => meet._id !== meetingId
            );
            user.save();
          }
        });
      });
      meeting.deleteOne({ _id: meetingId });
    })
    .catch((err) => next(err));
};

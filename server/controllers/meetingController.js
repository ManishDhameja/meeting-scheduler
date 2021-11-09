const Meeting = require("../models/meeting");
const User = require("../models/user");
const ObjectId = require('mongoose').Types.ObjectId;


exports.createMeeting = async (req, res, next) => {
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const title = req.body.title;
  const description = req.body.description;
  const meetingLink = req.body.meetingLink;
  const attendees = req.body.attendees;
  const host = req.body.host;

  try {
    for(const att of attendees) {
      await User.findOne({ username: att.username })
        .then((user) => {
          if (!user) {
            const err = new Error(`A user with username ${att.username} could not be found!`);
            err.statusCode = 401;
            throw err;
          }
          else {
            var flag = "notAvaliable";
            for(var i=0;i<user.workingHours.length;i++){
              hr = user.workingHours[i];
              if (hr.startTime <= startTime && hr.endTime >= endTime) {
                user.meetings.map((meet) => {
                  if ((meet.startTime >= startTime && meet.startTime <= endTime) || (meet.endTime >= startTime && meet.endTime <= endTime)) {
                    const err = new Error(`A user with username ${att.username} could not be found!`);
                    err.statusCode = 401;
                    throw err;
                  }
                });
                flag = "scheduled";
                // break;
              }
            }
            if (flag === "notAvaliable") {
              const err = new Error(`A user with username ${att.username} could not be found!`);
              err.statusCode = 401;
              return next(err);
            }
          }
        })
        .catch(err => {
          throw err;
        });
    }
  } catch(err) {
    return next(err);
  }

  Meeting.create({
    startTime: startTime,
    endTime: endTime,
    title: title,
    description: description,
    meetingLink: meetingLink,
    attendees: attendees,
    host: host
  })
  .then((meet) => {
    attendees.map((attendee) => {
      User.findOne({username:attendee.username})
      .then((user) => {
        if(!user){
          res.statusCode = 401;
          res.end(`A user with username ${attendee.username} could not be found!`);
        }
        else{
          user.meetings.push(meet._id);
          user.save();
        }
      }).catch(err => next(err));
    })
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(meet);
  })
  .catch((err) => {
    return next(err);
  });
};

exports.deleteMeeting = (req, res, next) => {
  const meetingId = req.body.meetingId;
  Meeting.findOne({ "_id": ObjectId(meetingId) })
    .then((meeting) => {
      if (!meeting) {
        const error = new Error("Meeting not found!!");
        error.statusCode = 401;
        next(error);
      }
      meeting.attendees.map((att) => {
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

exports.acceptMeeting = (req, res, next) => {
  const username = req.body.username;
  const meetingId = req.body.meetingId;
  Meeting.findById(meetingId)
    .then(meeting => {
      let flag = true;
      meeting.attendees.forEach((attendee, index) => {
        if (attendee.username === username) {
          flag = false;
          meeting.attendees[index].status = "Accepted";
        }
      })
      if (flag) {
        const err = new Error(`No user with username '${username}' found!`);
        err.statusCode = 400;
        return next(err);
      }
      meeting.save()
      .then(result => {
        res.json("Meeting accepted.");
      })
    })
    .catch(err => {
      next(err);
    })
}

exports.declineMeeting = (req, res, next) => {
  const username = req.body.username;
  const meetingId = req.body.meetingId;
  Meeting.findById(meetingId)
    .then(meeting => {
      if (!meeting) {
        const err = new Error(`Meeting not found.`);
        err.statusCode = 400;
        return next(err);
      }
      let flag = true;
      meeting.attendees.forEach((attendee, index) => {
        if (attendee.username === username) {
          flag = false;
          meeting.attendees[index].status = "Declined";
        }
      })
      if (flag) {
        const err = new Error(`No user with username '${username}' found!`);
        err.statusCode = 400;
        return next(err);
      }
      meeting.save()
      .then(result => {
        res.json("Meeting declined.");
      })
    })
    .catch(err => {
      next(err);
    })
}

exports.upcomingMeetings = (req,res,next) =>{
  const username = req.query.username;
  User.findOne({username : username}).populate("meetings")
  .then((user)=>{
    const upcomingMeetings = user.meetings.filter((meeting)=>{
      return meeting.startTime > Date.now();
    })
    res.status(200).json(upcomingMeetings);
  })
  .catch(err=>{
    next(err);
  })
}
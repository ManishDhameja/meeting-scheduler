const Meeting = require('../models/meeting');
const User = require('../models/user');

exports.createMeeting = (req,res,next) =>{
    const startTime = req.body.startTime,
    const endTime = req.body.endTime,
    const title = req.body.title,
    const description = req.body.description,
    const meetingLink = req.body.meetingLink,
    const attendee = rq.body.attendee;
    attendee.map((att) => {
        User.findOne({"username":att.username}).populate("meetings")
        .then((user) => {
          if(user) {
            const flag = "notAvaliable";
            user.workingHours.map((hr)=>{
                if((hr.startTime <= startTime) && (hr.endTime >= endTime)){
                    user.meetings.map((meet)=>{
                        if((meet.startTime>=startTime && meet.startTime<=endTime) || (meet.endTime>=startTime && meet.endTime<=endTime)){
                            const error = new Error(`${user} is already scheduled somewhere`);
                            error.statusCode = 401;
                            return next(error);
                        }
                    })
                    flag = "scheduled";
                    break;
                }
            });
            if(flag === "notAvaliable"){
                const error = new Error(`${user} is not avaliable`);
                error.statusCode = 401;
                return next(error);
            }else{
                user.meeting.create({
                  startTime : startTime,
                  endTime:endTime,
                  title:title,
                  description:description,
                  meetingLink:meetingLink,
                  attendee:attendee
                })
            }
          }
        })
        .catch((err)=>next(err));
      })

}

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
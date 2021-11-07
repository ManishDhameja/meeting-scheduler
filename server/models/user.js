const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hoursSchema = new Schema({
  startTime: {
    type : Date,
    required: true
  },
  endTime: {
    type : Date,
    required: true
  }
},{
  timestamps : true
});

const scheduledMeetingsSchema = new Schema({
  meetingID: {
      type: Number,
    required: true
  },
  startTime: {
    type : Date,
    required: true
  },
  endTime: {
    type : Date,
    required: true
  },
  type: {
    type: String,
    enum: {
      values: ['pending', 'denied', 'accepted'],
      message: '{VALUE} is not supported'
    }
  }
},{
  timestamps : true
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    workingHours: [hoursSchema],
    meetings: [scheduledMeetingsSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

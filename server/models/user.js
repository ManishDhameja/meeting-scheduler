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
  timestamps: true,
  usePushEach: true
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
    meetings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Meeting"
      }
    ],
  },
  {
    timestamps: true,
    usePushEach: true
  }
);

module.exports = mongoose.model("User", userSchema);

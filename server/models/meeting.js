const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    status: {
        type: String,
        enum: {
          values: ['Accepted', 'Pending', 'Denied'],
          message: '{VALUE} is not supported'
        }
    }
})

const meetingSchema = new Schema({
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true 
        },
        meetingLink: {
            type: String,
        },
        attendee : [attendeeSchema],
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Meeting', meetingSchema);
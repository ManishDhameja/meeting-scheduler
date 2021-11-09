const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/userRouter');
const meetingRouter = require('./routes/meetingRouter');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/meetings', meetingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  console.log(err);
  res.status(err.statusCode || 500).json({message: err.message});
});

// Connecting to mongodb
mongoose.connect('mongodb+srv://devninjas:devninjas@devninjas.yukd1.mongodb.net/test', 
{ 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
})
.then(result => {
    app.listen(process.env.PORT || 5000);
    console.log("Server started at port 5000");
})
.catch(err => {
    console.log(err);
})
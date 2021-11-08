const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const name = req.body.name;
    const city = req.body.city;

    User.findOne({email: email})
        .then(user => {
            if (user) {
                const err = new Error('Email already exists');
                err.statusCode = 403;
                return next(err);
            } else {
                User.findOne({username: username})
                    .then(user => {
                        if (user) {
                            const err = new Error('Username already exists');
                            err.statusCode = 403;
                            return next(err);
                        } else {
                            bcrypt.hash(password, 12) 
                                .then(hashedPassword => {
                                    const user = new User({
                                        name: name,
                                        username: username,
                                        email: email,
                                        city: city,
                                        password: hashedPassword
                                    });
                                    loadedUser = user;
                                    return user.save();
                                })
                                .then(result => {
                                    const token = jwt.sign(
                                        {
                                            email: result.email,
                                            userId: result._id.toString()
                                        }, 
                                        'secretKey',
                                        { expiresIn: '100h' }
                                    );
                                    res.status(201).json({
                                        message: "User Created", 
                                        userId: result._id, 
                                        token: token, 
                                        userEmail: email
                                    });
                                })
                        }
                    })
            }
        })
        .catch(err => {
            next(err);
        })
}

exports.signin = (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    let loadedUser;
    if (email) {
        User.findOne({email: email})
        .then(user => {
            if (!user) {
                const error = new Error("A user with this email could not be found!");
                error.statusCode = 401;
                next(error);
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error("Wrong Password!");
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                }, 
                'secretKey',
                { expiresIn: '100h' }
            );
            res.status(200).json({
                token: token, 
                userId: loadedUser._id.toString(),
                userEmail: loadedUser.email,
                userName: loadedUser.username
            });
        })
        .catch(err => {
            next(err);
        })
    } else {
        User.findOne({username: username})
        .then(user => {
            if (!user) {
                const error = new Error("A user with this username could not be found!");
                error.statusCode = 401;
                next(error);
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error("Wrong Password!");
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                }, 
                'secretKey',
                { expiresIn: '100h' }
            );
            res.status(200).json({
                token: token, 
                userId: loadedUser._id.toString(),
                userEmail: loadedUser.email
            });
        })
        .catch(err => {
            next(err);
        })
    }  
}

exports.verifyToken = (req, res, next) => {
    const token = req.body.token;
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretKey');
        res.json({message: "Token verified."});
    } catch (error) {
        const err = new Error("Token expired. Please sign-in to continue");
        err.statusCode = 401;
        next(err);
    }
}
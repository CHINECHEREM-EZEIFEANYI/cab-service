const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser'); 

const bcrypt = require('bcrypt')

function initialize(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        const usersCollection = db.collection('users');

        usersCollection.findOne({ email }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, { message: 'Email not registered' });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password does not match user' });
                }
            });
        });
    }));

    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser((id, done) => {
        const usersCollection = db.collection('users');

        usersCollection.findOne({ _id: ObjectId(id) }, (err, user) => {
            if (err) {
                return done(err);
            }
            return done(null, user);
        });
    });
}

module.exports = initialize
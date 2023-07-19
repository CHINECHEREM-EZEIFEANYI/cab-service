const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser'); 
const session = require('express-session'); 
const bcrypt = require('bcrypt')

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        pool.query(
            
            [email],
            (err, results) => {
                if (err) {
                    throw err
                }
                console.log(results.rows)

                if (results.rows.length > 0) {
                    const user = results.rows[0]
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password does not match user' })
                        }
                    });
                } else {
                    return done(null, false, { message: 'email not registered' })
                }
            }


        )

    }
    passport.use(
        new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        }, authenticateUser
        )
    );
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        [id], (err, results) => {
                if (err) {
                    throw err;
                }
                return done(null, results.rows[0])

            }
        )
    }
    )
};

module.exports = initialize;
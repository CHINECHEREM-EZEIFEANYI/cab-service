function authUser(req, res, next) {
    if (req.user == null) {
        req.flash('success_msg', 'You need to be authenticated to access this page, Login');
        res.redirect("/login");
        if (req.user.name == undefined) {
            return user
        }
    } next()
}
function authRole(req, res, next) {
    if (req.user.role != 'Admin') {
        req.flash('success_msg', 'Access denied, Login with Admin credentials to gain access');
        res.redirect("/login");
    }
    next()
}
function registerUser(email, password, done) {
    const usersCollection = db.collection('users');

    // Check if the email is already taken
    usersCollection.findOne({ email }, (err, existingUser) => {
        if (err) {
            return done(err);
        }

        if (existingUser) {
            return done(null, false, { message: 'Email already in use' });
        }

        // If the email is not taken, hash the password and create a new user
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return done(err);
            }

            const newUser = {
                email: email,
                password: hashedPassword,
            };

            // Insert the new user into the database
            usersCollection.insertOne(newUser, (err, result) => {
                if (err) {
                    return done(err);
                }

                return done(null, result.ops[0]);
            });
        });
    });
}



module.exports = { authUser, authRole, registerUser }
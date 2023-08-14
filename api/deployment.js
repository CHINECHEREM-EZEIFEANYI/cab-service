// api/login.js
exports.CheckEmailAndRegister = function (name, email, role, hashedPassword, req, res) {
    const usersCollection = db.collection('users');
    // Check if the email already exists in the "users" collection
    usersCollection.findOne({ email }, (err, existingUser) => {
        if (err) {
            throw err;
        }
        if (existingUser) {
            const errs = [{ message: 'Email already exists' }];
            return res.render('signup', { errs });
        } else {
            // Email does not exist, proceed with user registration
            const newUser = {
                name: name,
                email: email,
                role: role,
                password: hashedPassword
            };
            // Insert the new user document into the "users" collection
            usersCollection.insertOne(newUser, (err, result) => {
                if (err) {
                    throw err;
                }
                console.log("Registration successful");

                req.flash('success_msg', 'You are now registered. Please log in.');
                res.redirect('/login');
            });
        }
    });
};
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
var randtoken = require("rand-token");
const nodemailer = require("nodemailer");


var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
    }
});

var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Reset Password Link -ZeffyRide',
    html:
        '<p>You requested for reset password, kindly use this <a href="http://localhost:8000/users/newpasswordpage?token=' +
        token +
        '">link</a> to reset your password </p>'
};
mail.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log("mailing error");
    } else {
        console.log('Email sent: ' + info.response);
    }
});

exports.registerUser = async function (req, res) {
    const {
        name,
        email,
        role,
        password,
        password2
    } = req.body;

    console.log({
        name,
        email,
        role,
        password,
        password2,
    });

    let errs = [];
    if (password.length < 6) {
        errs.push({
            message: "password should be atleast 6 characters"
        });
    }
    if (password != password2) {
        errs.push({
            message: " passwords do not match"
        });
    }
    if (errs.length > 0) {
        res.render("signup", {
            errs
        });
    } else {
        //Form validation successful
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

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
    };
}

exports.ResetPassword = function (req, res) {
    var email = req.body.email;
    console.log(email);
    const usersCollection = db.collection('users');

    usersCollection.findOne({ email: email }, (err, user) => {
        if (err) {
            throw err;
        }

        if (user) {
            const token = randtoken.generate(10);
            sendEmail(email, token, (sendErr, sent) => {
                if (sendErr) {
                    throw sendErr;
                }

                if (sent !== "mailing error") {
                    const data = { token: token };

                    usersCollection.updateOne(
                        { _id: ObjectId(user._id) },
                        { $set: { token: data.token } },
                        (updateErr, updateResult) => {
                            if (updateErr) {
                                throw updateErr;
                            }

                            console.log(updateResult);

                            req.flash(
                                "success_msg",
                                "Your Password Reset link has been sent to your email"
                            );
                            res.render("index");

                        }
                    );
                } else {
                    req.flash("error", "Something went wrong, please try again");
                    res.render("passwordreset");
                }
            });
        } else {
            req.flash("error", "Email doesn't exist");
            res.render("passwordreset");
            console.log(res.headersSent)
        }
    });
};
exports.UpdatePassword = function (req, res) {
    const { token, password, password2 } = req.body;
    console.log({
        token,
        password,
        password2,
    });

    let errors = [];

    if (!password || !password2) {
        errors.push({ message: "Please enter all fields" });
    }
    if (!token) {
        errors.push({
            message:
                "No token found or token expired. Click on the forgot password link sent to your email if registered",
        });
    }

    if (password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters" });
    }
    if (password !== password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
        res.render("newpasswordpage", { errors });
    } else {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
            if (err) {
                throw err;
            }

            const db = client.db(dbName);
            const usersCollection = db.collection('users');

            const user = await usersCollection.findOne({ token });

            if (user) {
                const hashed = await bcrypt.hash(password, 10);

                usersCollection.updateOne(
                    { _id: ObjectId(user._id) },
                    { $set: { password: hashed } },
                    (updateErr, updateResult) => {
                        if (updateErr) {
                            throw updateErr;
                        }

                        console.log(updateResult);

                        req.flash(
                            "success_msg",
                            "Your Password has been changed successfully. Now, you can log in."
                        );
                        res.redirect("/users/newpasswordpage");

                        client.close(); // Close the MongoDB connection
                    }
                );
            } else {
                console.log("2");
                req.flash("error", "Invalid link, please try again");
                res.render("newpasswordpage", { errors });
            }
        });
    }
};

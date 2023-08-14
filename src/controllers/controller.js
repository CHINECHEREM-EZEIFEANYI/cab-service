const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
var randtoken = require("rand-token");
const nodemailer = require("nodemailer");

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

const mongoose = require('mongoose');
const User = require('../schema/driver-schema'); 
var randtoken = require("rand-token");
const bcryptjs = require('bcryptjs')
const genAuthToken = require("../utils/genAuthToken")
const nodemailer = require ("nodemailer")

function sendEmail(email, token) {
  var email = email;
  var token = token;

  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mynodemailtestmail@gmail.com",
      pass: "Nodemailer",
    },
  });

  var mailOptions = {
    from: "mynodemailtestmail@gmail.com",
    to: email,
    subject: "Reset Password Link - SwiftRides.com",
    text: `You requested a password reset. Please use the following link to reset your password: http://localhost:8000/api/users/newpasswordpage?token=${token}`,
  };

  mail.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log("Mailing error:", error);
    } else {
      console.log("Email sent successfully:", data.response);
    }
  });
}

exports.LoginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
    }
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).send(" Invalid Email or Password ");
    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) return res.status(400).send(" Invalid Email or Password ");
    const token = genAuthToken(user);
    res.status(201).json({ token, _id: user.id, email: email, message : "Logged in successfully" });
};
exports.RegisterUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send(" User with this email exist... ");

    const { FirstName, LastName, email, password, phonenumber, taxiType, accountType, licenseNumber } = req.body;
    if (accountType === "driver") {
        if (!email || !password || !LastName || !FirstName || !licenseNumber) {
            res.status(400).json({ message: "All fields are required"});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists"});
        }
        if (!licenseNumber) {
            res.status(400).json({ message: "License number is required for drivers"});
        }
        const islicenseNumber = await User.findOne({ licenseNumber });
        if (islicenseNumber) {
            res.status(400).json({ message: "User with this license number already exists"});
        }
        const driverDetails = {
            email,
            password,
            accountType,
            LastName,
            FirstName,
            taxiType,
            licenseNumber,
            isAvailable: false,
            rating: 0,
        };
        addDetailsToDatabase(driverDetails);
    } 






    user = new User({
        FirstName: FirstName,
        LastName: LastName,
        email: email,
        password: password,
        phonenumber: phonenumber,
        taxiType: taxiType,
        accountType: accountType,
        licenseNumber: licenseNumber
        
    });
    user.password = await bcryptjs.hash(user.password, 10);
    user = await user.save();
    const token = genAuthToken(user);
    res.status(201).json({ token,
        _id: user.id,
        email: user.email,
        message: "Registration successful",
    })
};
exports.ResetPassword = async (req, res) => {
    const email = req.body.email
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        const token = randtoken.generate(20)
        const sent = sendEmail(email, token)
        if (sent !== "mailing error") {
            const data = { token };
            await User.updateOne({ email }, {
                $set: {
                    resetToken: data,
                    resetTokenExpires: Date.now() + 600000,
                }
            });
            req.flash("success_msg", "Your Password Reset link has been sent to your email");
        } else {
            req.flash("error", "Something went wrong, please try again");
        }
    } else {
        res.status(400).send(" Invalid Email")
        req.flash("error", "Email doesn't exist");
    }
}
exports.UpdatePassword = async (req, res) => {
    const { token, password, password2 } = req.body;
    console.log({
        token,
        password,
        password2,
    });

    let errors = [];

    if (!password || !password2) {
        errors.push({ message: "please enter all fields" });
    }
    if (!token) {
        errors.push({
            message:
                "no token found/ token expired, click on the forgot password link sent to your mail if registered",
        });
    }

    if (password.length < 6) {
        errors.push({ message: "password should be atleast 6 characters" });
    }
    if (password != password2) {
        errors.push({ message: " passwords do not match" });
    }
    if (errors.length > 0) {
        res.status(400).json({ message: { errors } })
    } else {
        const info = { token: token }
    } const user = await user.findOne({ token: info.token })
    if (user) {
        const hashedPassword = await bcryptjs.hash(password, 10);
        await user.updateOne({ _id: user.id },
            {
                $set: {
                    password: hashedPassword,
                    resetToken: token,
                    resetTokenExpires: new Date(Date.now() + 300000), 
                },
            }
        )
        req.flash(
            "success_msg",
            "Your Password has been changed successfully, now Login");
        res.redirect("/newpasswordpage");
    
    }
    else {
        console.log("Invalid token.");
        req.flash("error", "Invalid link, please try again.");
    }
}

const mongoose = require('mongoose');
const User = require('../schema/driver-schema'); 
var randtoken = require("rand-token");
const bcryptjs = require('bcryptjs')
const genAuthToken = require("../utils/genAuthToken")
const nodemailer = require ("nodemailer")

function sendEmail(email, newPassword) {
  var email = email;
  var newPassword = newPassword;

  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER ,
        pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: "mynodemailtestmail@gmail.com",
    to: email,
    subject: "Reset Password Link - SwiftRides.com",
      text: `You requested a password reset. Please use the following link to reset your password: http://localhost:8000/api/users/inputpassword${newPassword}`,
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
    if (!user) return res.status(400).send(" Invalid Email ");
    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) return res.status(400).send(" Invalid Email or Password ");
    const token = genAuthToken(user);
    res.status(201).json({ token, _id: user.id, email: email, message : "Logged in successfully" });
};
exports.RegisterUser = async (req, res) => {
    const { FirstName, LastName, email, password, phonenumber, taxiType, accountType, licenseNumber } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        if (accountType === "driver") {
            if (!email || !password || !LastName || !FirstName || !licenseNumber || !taxiType) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const isLicenseNumber = await User.findOne({ licenseNumber });

            if (isLicenseNumber) {
                return res.status(400).json({ message: "User with this license number already exists" });
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

            driverDetails.password = await bcryptjs.hash(driverDetails.password, 10);
            user = await User.create(driverDetails);

            if (user) {
                return res.status(201).json({
                    _id: user.id,
                    email: user.email,
                    licenseNumber: user.licenseNumber,
                    message: "Registration successful",
                });
            } else {
                return res.status(400).json({ error: "Could not register user" });
            }
        } else if (accountType === "passenger") {
            if (!email || !password || !FirstName || !LastName) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const passengerDetails = {
                email,
                password,
                accountType,
                LastName,
                FirstName,
                phonenumber,
            };

            passengerDetails.password = await bcryptjs.hash(passengerDetails.password, 10);
            user = await User.create(passengerDetails);

            if (user) {
                return res.status(201).json({
                    _id: user.id,
                    email: user.email,
                    message: "Registration successful",
                });
            } else {
                return res.status(400).json({ error: "Could not register user" });
            }
        } else {
            return res.status(400).json({ message: "Invalid account type" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.ResetPassword = async (req, res) => {
    const email = req.body.email
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        //const token = randtoken.generate(20)
        const newPassword = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        await User.updateOne({ email }, {
            $set: {
                password: hashedPassword,
                resetToken: '', // Reset the token since the password has changed
                resetTokenExpires: Date.now() + 600000, 
            }
        });
        const sent = sendEmail(email, newPassword)
        if (sent !== "mailing error") {
            
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
    const { email, password, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log ("This User : ", user)
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }
        console.log("Current password from the database:", user.password);
        console.log("Current password from the request:", password);
        const hashedPassword = await bcryptjs.hash(password, 10);
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        console.log("the valid password: ", isPasswordValid)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid current password." });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "New password should be at least 6 characters." });
        }

      
        await User.updateOne(
            { _id: user._id },
            {
                $set: {
                    password: hashedPassword,
                },
            }
        );
 
        req.flash(
            "success_msg",
            "Your password has been changed successfully. You can now login with the new password."
        );
        return res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.InputPassword = async (req, res) => {
    const enteredCode = req.body.code;
    const expectedCode = '696897'; 

    if (enteredCode === expectedCode) {
       res.redirect('/login');
       // res.status(200).send('Oyah go back.');
    } else {
        res.status(400).send('Invalid code. Please try again.');
    }
}
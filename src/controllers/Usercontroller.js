const bcrypt = require('bcrypt')
const genAuthToken = require("../utils/genAuthToken");
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
  //      '<p>You requested for reset password, kindly use this <a href="http://localhost:8000/users/newpasswordpage?token=' +
    //    token +
        '">link</a> to reset your password </p>'
};
mail.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log("mailing error");
    } else {
        console.log('Email sent: ' + info.response);
    }
});

exports.registerUser = async(req, res)=> {
    let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send(" User with this email exist... ");

  const { name, email, password } = req.body;

  user = new User({
    name: name,
    email: email,
    password: password,
  });
  user.password = await bcrypt.hash(user.password, 10);
  user = await user.save();
  const token = genAuthToken(user);
  res.send(token);
   
};

//login user controller
exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) return res.status(400).send(" Invalid Email or Password ");
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send(" Invalid Email or Password ");
  const token = genAuthToken(user);
  res.send(token);
};

exports.updatePassword = function (req, res) {
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
